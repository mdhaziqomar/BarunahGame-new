"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../generated/prisma");
const router = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
// Get all questions (for admin)
router.get('/', async (req, res) => {
    try {
        const questions = await prisma.question.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json({ questions });
    }
    catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Create new question
router.post('/', async (req, res) => {
    try {
        const { question, optionA, optionB, optionC, optionD, correctAnswer, explanation, subject, difficulty } = req.body;
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
    }
    catch (error) {
        console.error('Create question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Bulk create questions
router.post('/bulk', async (req, res) => {
    try {
        const { questions } = req.body;
        const createdQuestions = await prisma.question.createMany({
            data: questions
        });
        res.status(201).json({
            message: 'Questions created successfully',
            count: createdQuestions.count
        });
    }
    catch (error) {
        console.error('Bulk create questions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Update question
router.put('/:id', async (req, res) => {
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
    }
    catch (error) {
        console.error('Update question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Delete question
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.question.delete({
            where: { id }
        });
        res.json({ message: 'Question deleted successfully' });
    }
    catch (error) {
        console.error('Delete question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=question.js.map