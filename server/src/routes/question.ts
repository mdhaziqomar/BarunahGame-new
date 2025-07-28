import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();
const prisma = new PrismaClient();

// Get all questions (for admin)
router.get('/', async (req: any, res: any) => {
  try {
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ questions });
  } catch (error) {
    console.error('Get questions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new question
router.post('/', async (req: any, res: any) => {
  try {
    const {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      explanation,
      subject,
      difficulty
    } = req.body;

    const newQuestion = await prisma.question.create({
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        explanation,
        subject,
        difficulty
      }
    });

    res.status(201).json({
      message: 'Question created successfully',
      question: newQuestion
    });
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bulk create questions
router.post('/bulk', async (req: any, res: any) => {
  try {
    const { questions } = req.body;

    const createdQuestions = await prisma.question.createMany({
      data: questions
    });

    res.status(201).json({
      message: 'Questions created successfully',
      count: createdQuestions.count
    });
  } catch (error) {
    console.error('Bulk create questions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// BULK REFRESH - Import all questions from compiled file (INSTANT UPDATE)
router.post('/refresh', async (req: any, res: any) => {
  try {
    console.log('🔄 Starting bulk question refresh...');
    
    // Clear all existing questions
    const deletedQuestions = await prisma.question.deleteMany({});
    console.log(`🗑️ Deleted ${deletedQuestions.count} existing questions`);
    
    // Import from compiled file
    const questionsPath = path.join(__dirname, '../../questions/compiled-questions.json');
    const questionsData = fs.readFileSync(questionsPath, 'utf8');
    const questions = JSON.parse(questionsData);
    
    console.log(`📖 Found ${questions.length} questions to import...`);
    
    // Import in batches for better performance
    const batchSize = 50;
    let totalImported = 0;
    
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const questionData = batch.map(question => ({
        question: question.question,
        optionA: question.optionA,
        optionB: question.optionB,
        optionC: question.optionC,
        optionD: question.optionD,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation || '',
        subject: question.subject as any,
        difficulty: question.difficulty as any
      }));
      
      await prisma.question.createMany({
        data: questionData
      });
      
      totalImported += batch.length;
    }
    
    console.log(`✅ Successfully refreshed ${totalImported} questions`);
    
    res.json({
      message: 'Questions refreshed successfully',
      deletedCount: deletedQuestions.count,
      importedCount: totalImported
    });
  } catch (error) {
    console.error('❌ Bulk refresh error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update question
router.put('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const question = await prisma.question.update({
      where: { id },
      data: updateData
    });

    res.json({
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete question
router.delete('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;

    await prisma.question.delete({
      where: { id }
    });

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get question statistics
router.get('/stats', async (req: any, res: any) => {
  try {
    const totalQuestions = await prisma.question.count();
    const easyQuestions = await prisma.question.count({
      where: { difficulty: 'EASY' }
    });
    const mediumQuestions = await prisma.question.count({
      where: { difficulty: 'MEDIUM' }
    });
    const hardQuestions = await prisma.question.count({
      where: { difficulty: 'HARD' }
    });
    
    const subjectStats = await prisma.question.groupBy({
      by: ['subject'],
      _count: {
        subject: true
      }
    });

    res.json({
      totalQuestions,
      difficultyBreakdown: {
        easy: easyQuestions,
        medium: mediumQuestions,
        hard: hardQuestions
      },
      subjectBreakdown: subjectStats.map(stat => ({
        subject: stat.subject,
        count: stat._count.subject
      }))
    });
  } catch (error) {
    console.error('Get question stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 