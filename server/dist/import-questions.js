"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new prisma_1.PrismaClient();
// Function to import questions from JSON file
async function importQuestions() {
    try {
        console.log('📚 Importing questions from JSON...');
        // Read questions from JSON file
        const questionsPath = path.join(__dirname, 'questions.json');
        if (!fs.existsSync(questionsPath)) {
            console.log('❌ questions.json file not found. Creating template...');
            // Create template JSON file
            const template = [
                {
                    "question": "What does MIB stand for?",
                    "optionA": "Malay Islam Beraja",
                    "optionB": "Modern Islamic Brunei",
                    "optionC": "Monarchy Islam Brunei",
                    "optionD": "Malay Islamic Brotherhood",
                    "correctAnswer": "A",
                    "explanation": "MIB stands for Melayu Islam Beraja, the national philosophy of Brunei.",
                    "subject": "GENERAL_MIB",
                    "difficulty": "EASY"
                }
            ];
            fs.writeFileSync(questionsPath, JSON.stringify(template, null, 2));
            console.log('✅ Template questions.json created. Please add your questions and run again.');
            return;
        }
        const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
        // Import each question
        for (const question of questionsData) {
            await prisma.question.create({
                data: {
                    question: question.question,
                    optionA: question.optionA,
                    optionB: question.optionB,
                    optionC: question.optionC,
                    optionD: question.optionD,
                    correctAnswer: question.correctAnswer,
                    explanation: question.explanation,
                    subject: question.subject,
                    difficulty: question.difficulty
                }
            });
        }
        console.log(`✅ Successfully imported ${questionsData.length} questions`);
    }
    catch (error) {
        console.error('❌ Error importing questions:', error);
    }
}
importQuestions()
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=import-questions.js.map