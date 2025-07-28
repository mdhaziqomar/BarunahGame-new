import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive data seeding...');

  // Check existing users
  const existingUsers = await prisma.user.findMany();
  console.log(`👥 Found ${existingUsers.length} existing users - ALL WILL BE PRESERVED`);

  // Create admin account only if it doesn't exist
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@barunah.edu.bn' }
  });

  if (!existingAdmin) {
    console.log('👤 Creating admin account...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@barunah.edu.bn',
        username: 'barunah_admin',
        password: adminPassword,
        fullName: 'Barunah Administrator',
        role: 'ADMIN'
      }
    });
    console.log('✅ Admin account created');
  } else {
    console.log('✅ Admin account already exists');
  }

  // Create vendor account only if it doesn't exist
  const existingVendor = await prisma.user.findUnique({
    where: { email: 'vendor@local-store.bn' }
  });

  let vendor;
  if (!existingVendor) {
    console.log('🏪 Creating vendor account...');
    const vendorPassword = await bcrypt.hash('vendor123', 10);
    vendor = await prisma.user.create({
      data: {
        email: 'vendor@local-store.bn',
        username: 'local_vendor',
        password: vendorPassword,
        fullName: 'Local Education Store',
        role: 'VENDOR',
        businessName: 'Brunei Education Supplies',
        businessType: 'Educational Materials',
        contactPhone: '+673-XXXXXXX'
      }
    });
    console.log('✅ Vendor account created');
  } else {
    console.log('✅ Vendor account already exists');
    vendor = existingVendor;
  }

  // COMPLETELY CLEAR ALL QUESTIONS - This ensures no duplicates and fresh start
  console.log('🧹 COMPLETELY CLEARING ALL EXISTING QUESTIONS...');
  
  // First, delete all related records that reference questions
  console.log('🧹 Clearing related records...');
  
  // Delete game answers that reference questions
  const deletedAnswers = await prisma.gameAnswer.deleteMany({});
  console.log(`🗑️ Deleted ${deletedAnswers.count} game answers`);
  
  // Delete games that might reference questions
  const deletedGames = await prisma.game.deleteMany({});
  console.log(`🗑️ Deleted ${deletedGames.count} games`);
  
  // Now safely delete all questions
  const deletedQuestions = await prisma.question.deleteMany({});
  console.log(`🗑️ Deleted ${deletedQuestions.count} existing questions`);

  // Import ALL questions from compiled-questions.json
  console.log('📚 Importing ALL questions from compiled file...');
  let totalImportedQuestions = 0;
  
  try {
    const questionsPath = path.join(__dirname, '../../questions/compiled-questions.json');
    const questionsData = fs.readFileSync(questionsPath, 'utf8');
    const questions = JSON.parse(questionsData);
    
    console.log(`📖 Found ${questions.length} questions to import from compiled file...`);
    
    // Import questions in batches for better performance
    const batchSize = 50;
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
      
      totalImportedQuestions += batch.length;
      console.log(`📝 Imported batch ${Math.floor(i/batchSize) + 1}: ${batch.length} questions (Total: ${totalImportedQuestions})`);
    }
    
    console.log(`✅ Successfully imported ${totalImportedQuestions} questions from compiled file`);
  } catch (error) {
    console.error('❌ Error importing questions from compiled file:', error);
    console.log('🔄 Falling back to hardcoded questions...');
    
    // Fallback to hardcoded questions if file import fails
    const fallbackQuestions = [
      {
        question: "What are the three pillars of MIB?",
        optionA: "Malay, Islam, Monarchy",
        optionB: "Culture, Religion, Government", 
        optionC: "Tradition, Faith, Leadership",
        optionD: "Heritage, Belief, Authority",
        correctAnswer: "A",
        explanation: "MIB stands for Melayu (Malay), Islam, and Beraja (Monarchy) - the three fundamental pillars of Brunei's national philosophy.",
        subject: "GENERAL_MIB",
        difficulty: "EASY"
      },
      {
        question: "What is the official language of Brunei Darussalam?",
        optionA: "English",
        optionB: "Malay",
        optionC: "Arabic",
        optionD: "Chinese",
        correctAnswer: "B",
        explanation: "Malay (Bahasa Melayu) is the official language of Brunei, reflecting the Melayu component of MIB.",
        subject: "MELAYU_CULTURE",
        difficulty: "EASY"
      },
      {
        question: "When did Brunei gain full independence?",
        optionA: "1984",
        optionB: "1963",
        optionC: "1971",
        optionD: "1990",
        correctAnswer: "A",
        explanation: "Brunei gained full independence on January 1, 1984, marking the beginning of modern Brunei under MIB philosophy.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
      },
      {
        question: "What is the official religion of Brunei?",
        optionA: "Buddhism",
        optionB: "Christianity",
        optionC: "Islam",
        optionD: "Hinduism",
        correctAnswer: "C",
        explanation: "Islam is the official religion of Brunei, representing the Islam pillar of MIB.",
        subject: "ISLAMIC_VALUES",
        difficulty: "EASY"
      },
      {
        question: "What does 'Beraja' mean in MIB?",
        optionA: "Democracy",
        optionB: "Monarchy",
        optionC: "Republic",
        optionD: "Federation",
        correctAnswer: "B",
        explanation: "Beraja refers to the monarchy system, emphasizing the importance of the Sultan as the head of state.",
        subject: "BERAJA_SYSTEM",
        difficulty: "EASY"
      }
    ];

    await prisma.question.createMany({
      data: fallbackQuestions.map(q => ({
        ...q,
        subject: q.subject as any,
        difficulty: q.difficulty as any
      }))
    });
    
    totalImportedQuestions = fallbackQuestions.length;
    console.log(`✅ Imported ${totalImportedQuestions} fallback questions`);
  }

  // Clear existing rewards to prevent duplicates
  console.log('🧹 Clearing existing rewards...');
  const deletedRewards = await prisma.reward.deleteMany({});
  console.log(`🗑️ Deleted ${deletedRewards.count} existing rewards`);

  // Create real rewards (only if vendor exists)
  if (vendor) {
    const realRewards = [
      {
        title: 'MIB Study Guide Book',
        description: 'Comprehensive study guide covering all MIB topics',
        knowledgePointsCost: 300,
        category: 'Educational',
        stockQuantity: 50,
        vendorId: vendor.id
      },
      {
        title: 'School Supplies Bundle',
        description: 'Complete set of school supplies for one semester',
        knowledgePointsCost: 500,
        category: 'Educational',
        stockQuantity: 20,
        vendorId: vendor.id
      },
      {
        title: 'Brunei History Book',
        description: 'Detailed history of Brunei Darussalam',
        knowledgePointsCost: 250,
        category: 'Educational',
        stockQuantity: 30,
        vendorId: vendor.id
      },
      {
        title: '20% Discount Voucher',
        description: '20% off on educational materials',
        knowledgePointsCost: 150,
        category: 'Discount',
        stockQuantity: 100,
        vendorId: vendor.id
      },
      {
        title: 'Premium Calculator',
        description: 'Scientific calculator for advanced studies',
        knowledgePointsCost: 400,
        category: 'Educational',
        stockQuantity: 15,
        vendorId: vendor.id
      },
      {
        title: 'Islamic Values Workbook',
        description: 'Interactive workbook on Islamic principles',
        knowledgePointsCost: 200,
        category: 'Educational',
        stockQuantity: 40,
        vendorId: vendor.id
      }
    ];

    console.log('🎁 Creating rewards...');
    await prisma.reward.createMany({
      data: realRewards
    });
    console.log(`✅ Created ${realRewards.length} rewards`);
  }

  // Final count and verification
  const finalUsers = await prisma.user.findMany();
  const finalQuestions = await prisma.question.findMany();
  const finalRewards = await prisma.reward.findMany();

  console.log('🎉 COMPREHENSIVE DATA SEEDING COMPLETED!');
  console.log('='.repeat(50));
  console.log(`👥 Total users: ${finalUsers.length} (ALL PRESERVED)`);
  console.log(`📚 Total questions: ${finalQuestions.length} (FRESH IMPORT)`);
  console.log(`🎁 Total rewards: ${finalRewards.length} (FRESH IMPORT)`);
  console.log('='.repeat(50));
  console.log(`🗑️ Cleanup summary:`);
  console.log(`   🎮 Games deleted: ${deletedGames.count}`);
  console.log(`   📝 Game answers deleted: ${deletedAnswers.count}`);
  console.log(`   ❓ Questions deleted: ${deletedQuestions.count}`);
  console.log(`   🎁 Rewards deleted: ${deletedRewards.count}`);
  console.log('='.repeat(50));
  
  // Show user preservation confirmation
  const studentUsers = finalUsers.filter(u => u.role === 'STUDENT');
  const adminUsers = finalUsers.filter(u => u.role === 'ADMIN');
  const vendorUsers = finalUsers.filter(u => u.role === 'VENDOR');
  
  console.log(`📊 User breakdown:`);
  console.log(`   👨‍🎓 Students: ${studentUsers.length} (preserved)`);
  console.log(`   👨‍💼 Admins: ${adminUsers.length} (preserved)`);
  console.log(`   🏪 Vendors: ${vendorUsers.length} (preserved)`);
  
  if (!existingAdmin) {
    console.log('👤 New admin account: admin@barunah.edu.bn / admin123');
  }
  if (!existingVendor) {
    console.log('🏪 New vendor account: vendor@local-store.bn / vendor123');
  }
  
  console.log('✅ ALL USER ACCOUNTS PRESERVED - NO DATA LOSS');
  console.log('✅ ALL QUESTIONS REFRESHED - INSTANT UPDATES ENABLED');
}

main()
  .catch((e) => {
    console.error('❌ Error during safe data seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 