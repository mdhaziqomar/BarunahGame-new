"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Import routes
const auth_1 = __importDefault(require("./routes/auth"));
const game_1 = __importDefault(require("./routes/game"));
const user_1 = __importDefault(require("./routes/user"));
const question_1 = __importDefault(require("./routes/question"));
const reward_1 = __importDefault(require("./routes/reward"));
const admin_1 = __importDefault(require("./routes/admin"));
const vendor_1 = __importDefault(require("./routes/vendor"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
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
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/game', game_1.default);
app.use('/api/user', user_1.default);
app.use('/api/questions', question_1.default);
app.use('/api/rewards', reward_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/vendor', vendor_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
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
app.use((err, req, res, next) => {
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
server.listen(PORT, () => {
    console.log(`🚀 Barunah server running on port ${PORT}`);
    console.log(`🌐 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
//# sourceMappingURL=index.js.map