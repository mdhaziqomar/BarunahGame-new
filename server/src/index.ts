import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth';
import gameRoutes from './routes/game';
import userRoutes from './routes/user';
import questionRoutes from './routes/question';
import rewardRoutes from './routes/reward';
import adminRoutes from './routes/admin';
import vendorRoutes from './routes/vendor';
import reviewRoutes from './routes/review';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Trust proxy for rate limiting behind reverse proxy (Render, etc.)
app.set('trust proxy', 1);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://barunah-frontend.onrender.com',
    'http://localhost:5173', // for local development
    'https://barunah.chms.edu.bn' // your custom domain
  ],
  credentials: true
}));

// Rate limiting - More generous for free tier
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased to 1000 requests per 15 minutes
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes except health check
app.use('/api/', limiter);

// More lenient rate limiting for public endpoints
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // Even more generous for public endpoints
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: '15 minutes'
  }
});

// Apply more lenient rate limiting to specific public routes
app.use('/api/reviews/recent', publicLimiter);
app.use('/api/questions', publicLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle game events
  socket.on('join-game', (data) => {
    socket.join(data.gameId);
    console.log(`User ${socket.id} joined game ${data.gameId}`);
  });

  socket.on('submit-answer', (data) => {
    // Handle answer submission
    socket.to(data.gameId).emit('answer-submitted', {
      playerId: socket.id,
      answer: data.answer,
      timestamp: Date.now()
    });
  });

  socket.on('timer-sync', (data) => {
    // Sync timer across clients
    socket.to(data.gameId).emit('timer-update', {
      timeLeft: data.timeLeft,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, async () => {
  console.log(`🚀 Barunah server running on port ${PORT}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  
  // Check if we need to seed data (only in production)
  if (process.env.NODE_ENV === 'production') {
    try {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      
      // Check if we have questions
      const questionCount = await prisma.question.count();
      console.log(`📚 Found ${questionCount} existing questions`);
      
      // Always run safe seeding in production to ensure fresh questions
      console.log('🌱 Running safe seeding to refresh questions...');
      require('./seed-safe');
      console.log('✅ Safe seeding completed');
      
      await prisma.$disconnect();
    } catch (error) {
      console.error('❌ Error during seeding check:', error);
    }
  }
}); 