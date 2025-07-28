import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Real MIB Questions for Barunah!
const realQuestions = [
  // EASY Questions (15 seconds timer, 10 KP each)
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
  },
  {
    question: "Which Sultan is known as the 'Father of Independence'?",
    optionA: "Sultan Omar Ali Saifuddien III",
    optionB: "Sultan Hassanal Bolkiah",
    optionC: "Sultan Abdul Jalilul Akbar",
    optionD: "Sultan Muhammad Alauddin",
    correctAnswer: "A",
    explanation: "Sultan Omar Ali Saifuddien III is known as the 'Father of Independence' for his role in Brunei's path to independence.",
    subject: "BRUNEI_HISTORY",
    difficulty: "EASY"
  },
  {
    question: "What is the national flower of Brunei?",
    optionA: "Orchid",
    optionB: "Rose",
    optionC: "Jasmine",
    optionD: "Lotus",
    correctAnswer: "A",
    explanation: "The orchid is the national flower of Brunei, symbolizing beauty and grace.",
    subject: "MELAYU_CULTURE",
    difficulty: "EASY"
  },
  {
    question: "What is the traditional Malay greeting?",
    optionA: "Hello",
    optionB: "Salam",
    optionC: "Hi",
    optionD: "Good morning",
    correctAnswer: "B",
    explanation: "Salam is the traditional Malay greeting, reflecting Islamic and cultural values.",
    subject: "MELAYU_CULTURE",
    difficulty: "EASY"
  },
  {
    question: "What is the capital city of Brunei?",
    optionA: "Bandar Seri Begawan",
    optionB: "Kuala Belait",
    optionC: "Tutong",
    optionD: "Seria",
    correctAnswer: "A",
    explanation: "Bandar Seri Begawan is the capital city of Brunei Darussalam.",
    subject: "BRUNEI_HISTORY",
    difficulty: "EASY"
  },
  {
    question: "What is the main principle of Islamic governance in MIB?",
    optionA: "Democracy",
    optionB: "Justice and consultation",
    optionC: "Socialism",
    optionD: "Capitalism",
    correctAnswer: "B",
    explanation: "Islamic governance in MIB emphasizes justice and consultation (Syura) as core principles.",
    subject: "ISLAMIC_VALUES",
    difficulty: "EASY"
  }
];

async function main() {
  console.log('🌱 Starting safe data seeding...');

  // Check existing users
  const existingUsers = await prisma.user.findMany();
  console.log(`👥 Found ${existingUsers.length} existing users`);

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

  // Clear existing questions to prevent duplicates
  console.log('🧹 Clearing existing questions...');
  await prisma.question.deleteMany({});

  // Insert real questions
  console.log('📚 Inserting questions...');
  for (const question of realQuestions) {
    await prisma.question.create({
      data: {
        ...question,
        subject: question.subject as any,
        difficulty: question.difficulty as any
      }
    });
  }

  // Clear existing rewards to prevent duplicates
  console.log('🧹 Clearing existing rewards...');
  await prisma.reward.deleteMany({});

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
    for (const reward of realRewards) {
      await prisma.reward.create({
        data: reward
      });
    }
  }

  // Final count
  const finalUsers = await prisma.user.findMany();
  const finalQuestions = await prisma.question.findMany();
  const finalRewards = await prisma.reward.findMany();

  console.log('✅ Safe data seeding completed!');
  console.log(`👥 Total users: ${finalUsers.length} (preserved existing users)`);
  console.log(`📚 Total questions: ${finalQuestions.length}`);
  console.log(`🎁 Total rewards: ${finalRewards.length}`);
  
  if (!existingAdmin) {
    console.log('👤 New admin account: admin@barunah.edu.bn / admin123');
  }
  if (!existingVendor) {
    console.log('🏪 New vendor account: vendor@local-store.bn / vendor123');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during safe data seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 