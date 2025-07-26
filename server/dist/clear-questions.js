"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function clearQuestions() {
    console.log('🗑️ Clearing all questions...');
    // Delete all game answers first (foreign key constraint)
    await prisma.gameAnswer.deleteMany({});
    // Delete all questions
    const result = await prisma.question.deleteMany({});
    console.log(`✅ Deleted ${result.count} questions`);
}
clearQuestions()
    .catch((e) => {
    console.error('❌ Error clearing questions:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=clear-questions.js.map