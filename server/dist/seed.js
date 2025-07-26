"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const questions = [
    // Easy Questions
    {
        question: "What is the official religion of Brunei Darussalam?",
        optionA: "Christianity",
        optionB: "Buddhism",
        optionC: "Islam",
        optionD: "Hinduism",
        correctAnswer: "C",
        explanation: "Islam is the official religion of Brunei Darussalam as stated in the country's constitution.",
        subject: "ISLAMIC_VALUES",
        difficulty: "EASY"
    },
    // Student Questions from zhiling.txt
    {
        question: "In what century had Brunei successfully conquered several adjacent (surrounding) regions?",
        optionA: "19th Century AD",
        optionB: "14th Century BC",
        optionC: "10th century BC",
        optionD: "13th Century AD",
        correctAnswer: "A",
        explanation: "Brunei successfully conquered several adjacent regions in the 19th Century AD.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "Who was the Italian explorer from Venice who successfully ventured into Asia?",
        optionA: "Miquel Lopez",
        optionB: "Vasco Da Gama",
        optionC: "Marco Polo",
        optionD: "Ferdinand Magellan",
        correctAnswer: "C",
        explanation: "Marco Polo was the Italian explorer from Venice who successfully ventured into Asia.",
        subject: "BERAJA_SYSTEM",
        difficulty: "EASY"
    },
    {
        question: "The Perahu Tambang is also classified as a Bidar Boat based on what?",
        optionA: "The sharp tip",
        optionB: "The materials used",
        optionC: "The amount of seats",
        optionD: "The type of wood",
        correctAnswer: "A",
        explanation: "The Perahu Tambang is classified as a Bidar Boat based on its sharp tip.",
        subject: "MELAYU_CULTURE",
        difficulty: "HARD"
    },
    {
        question: "Where were Belanggar houses commonly built?",
        optionA: "Brunei's water villages",
        optionB: "Around rainforests",
        optionC: "On mountain tops",
        optionD: "On land",
        correctAnswer: "A",
        explanation: "Belanggar houses were commonly built in Brunei's water villages.",
        subject: "BERAJA_SYSTEM",
        difficulty: "EASY"
    },
    {
        question: "Where did the cottage industry of weaving originate?",
        optionA: "Kampong Lurong Sikuna",
        optionB: "Kampong Ujong Bukit",
        optionC: "Kampong Sungai Kedayan",
        optionD: "Kampong Bakut Si Raja Muda",
        correctAnswer: "C",
        explanation: "The cottage industry of weaving originated in Kampong Sungai Kedayan.",
        subject: "MELAYU_CULTURE",
        difficulty: "HARD"
    },
    {
        question: "Historically, what was used to make balat fish traps?",
        optionA: "Wood",
        optionB: "Fish bait",
        optionC: "Seaweed",
        optionD: "Bamboo",
        correctAnswer: "D",
        explanation: "Historically, bamboo was used to make balat fish traps.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "Who documented the genealogy of the Kings who ruled over the State of Brunei?",
        optionA: "Brunei Malay Nobles",
        optionB: "Datu Imam Yaakub",
        optionC: "Prophet Muhammad",
        optionD: "Sultan Ahmad",
        correctAnswer: "B",
        explanation: "Datu Imam Yaakub documented the genealogy of the Kings who ruled over the State of Brunei.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "Under what scientific name is ginger classified?",
        optionA: "Curcuma Domestical Val",
        optionB: "Coriandrum Sativum Linn",
        optionC: "Zingiber Officinalis Rose",
        optionD: "Rosa Rubiginosa",
        correctAnswer: "C",
        explanation: "Ginger is classified under the scientific name Zingiber Officinalis Rose.",
        subject: "ISLAMIC_VALUES",
        difficulty: "HARD"
    },
    {
        question: "What were the typical features or components of traditional Dusun houses?",
        optionA: "A wooden rooftop",
        optionB: "Two bedrooms",
        optionC: "Three toilets",
        optionD: "Sago Trunk",
        correctAnswer: "D",
        explanation: "Sago Trunk was a typical feature or component of traditional Dusun houses.",
        subject: "BERAJA_SYSTEM",
        difficulty: "EASY"
    },
    // Student Questions from JSON files
    {
        question: "When did Brunei officially regain its independence from British protection?",
        optionA: "1963",
        optionB: "1984",
        optionC: "1971",
        optionD: "1959",
        correctAnswer: "B",
        explanation: "Brunei officially regained its independence from British protection in 1984.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "Which treaty marked the beginning of British protection over Brunei in 1888?",
        optionA: "Treaty of Paris",
        optionB: "Treaty of Protection",
        optionC: "Treaty of Independence",
        optionD: "Treaty of London",
        correctAnswer: "B",
        explanation: "The Treaty of Protection marked the beginning of British protection over Brunei in 1888.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "Who is considered the architect of Brunei's modern MIB philosophy?",
        optionA: "Sultan Haji Hassanal Bolkiah",
        optionB: "Sultan Muhammad Shah",
        optionC: "Sultan Jamalul Alam",
        optionD: "Pengiran Muda Hashim",
        correctAnswer: "A",
        explanation: "Sultan Haji Hassanal Bolkiah is considered the architect of Brunei's modern MIB philosophy.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "What year did the MIB concept officially become the national philosophy of Brunei?",
        optionA: "1959",
        optionB: "1984",
        optionC: "1992",
        optionD: "1971",
        correctAnswer: "B",
        explanation: "The MIB concept officially became the national philosophy of Brunei in 1984.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "Which Sultan of Brunei was instrumental in signing the 1959 Constitution that marked internal self-governance?",
        optionA: "Sultan Hassanal Bolkiah",
        optionB: "Sultan Omar Ali Saifuddien III",
        optionC: "Sultan Ahmad Tajuddin",
        optionD: "Sultan Muhammad Jamalul Alam",
        correctAnswer: "B",
        explanation: "Sultan Omar Ali Saifuddien III was instrumental in signing the 1959 Constitution that marked internal self-governance.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What is the significance of Sultan Sharif Ali's reign in shaping Brunei's Islamic identity within the MIB philosophy?",
        optionA: "He introduced the Jawi script",
        optionB: "He was the first Sultan to fully implement Islamic law and build mosques",
        optionC: "He signed a treaty with the Ottomans",
        optionD: "He translated the Quran into Malay",
        correctAnswer: "B",
        explanation: "Sultan Sharif Ali was the first Sultan to fully implement Islamic law and build mosques, shaping Brunei's Islamic identity.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "How did the 1888 Treaty of Protection affect Brunei's sovereignty in the context of MIB?",
        optionA: "It enhanced Brunei's Islamic governance",
        optionB: "It dissolved the monarchy temporarily",
        optionC: "It preserved internal Islamic and monarchical structures while surrendering foreign affairs to Britain",
        optionD: "It unified Brunei with Sabah under British rule",
        correctAnswer: "C",
        explanation: "The 1888 Treaty of Protection preserved internal Islamic and monarchical structures while surrendering foreign affairs to Britain.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "How does the concept of Daulat (sovereignty) under MIB differ from Western secular constitutionalism?",
        optionA: "Daulat is limited by the constitution, similar to constitutional monarchies",
        optionB: "Daulat under MIB is symbolic and has no legal authority",
        optionC: "Daulat under MIB is divine-right based, blending Islamic legitimacy with traditional Malay monarchy",
        optionD: "Daulat refers only to Brunei's international sovereignty, not domestic leadership",
        correctAnswer: "C",
        explanation: "Daulat under MIB is divine-right based, blending Islamic legitimacy with traditional Malay monarchy.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "Which philosophical tension exists within the MIB framework when balancing Islamic law and Malay adat (custom)?",
        optionA: "Adat fully overrides Syariah in Brunei courts",
        optionB: "Some adat practices predate Islam and require reinterpretation to align with Syariah principles",
        optionC: "Adat is considered irrelevant in MIB governance",
        optionD: "There is no conflict; adat and Syariah are the same",
        correctAnswer: "B",
        explanation: "Some adat practices predate Islam and require reinterpretation to align with Syariah principles.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "In pre-modern Brunei, which legal system coexisted with Islamic jurisprudence and later became subsumed under the MIB philosophy?",
        optionA: "English common law",
        optionB: "Malay customary law (Undang-Undang Adat Melayu)",
        optionC: "Hindu-Buddhist Dharmasastra codes",
        optionD: "Roman-Dutch law",
        correctAnswer: "B",
        explanation: "Malay customary law (Undang-Undang Adat Melayu) coexisted with Islamic jurisprudence in pre-modern Brunei.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "Which Sultan was responsible for the signing of the 1959 Constitution that laid the groundwork for Brunei's self-governance?",
        optionA: "Sultan Muhammad Jamalul Alam",
        optionB: "Sultan Hassanal Bolkiah",
        optionC: "Sultan Omar Ali Saifuddien III",
        optionD: "Sultan Ahmad Tajuddin",
        correctAnswer: "C",
        explanation: "Sultan Omar Ali Saifuddien III was responsible for signing the 1959 Constitution that laid the groundwork for Brunei's self-governance.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What was a key effect of the 1888 Treaty of Protection between Brunei and Britain?",
        optionA: "Abolished the monarchy",
        optionB: "Made Brunei a full British colony",
        optionC: "Britain took control of Brunei's foreign affairs but left internal matters to the Sultan",
        optionD: "Merged Brunei with Sarawak",
        correctAnswer: "C",
        explanation: "Britain took control of Brunei's foreign affairs but left internal matters to the Sultan under the 1888 Treaty of Protection.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What was the main objective of the 1959 Brunei Constitution in relation to MIB?",
        optionA: "To abolish the monarchy",
        optionB: "To introduce a secular government",
        optionC: "To establish Brunei as an Islamic constitutional monarchy",
        optionD: "To join Brunei with Malaysia",
        correctAnswer: "C",
        explanation: "The main objective of the 1959 Brunei Constitution was to establish Brunei as an Islamic constitutional monarchy.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "Which ethnic group primarily shapes the \"Malay\" identity in the Melayu Islam Beraja philosophy?",
        optionA: "Javanese",
        optionB: "Bugis",
        optionC: "Bruneian Malays",
        optionD: "Minangkabau",
        correctAnswer: "C",
        explanation: "Bruneian Malays primarily shape the \"Malay\" identity in the Melayu Islam Beraja philosophy.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "What is the significance of the Sultan's title \"Seri Begawan\" in relation to MIB?",
        optionA: "It means \"Warrior King\"",
        optionB: "It honors Sultan Omar Ali Saifuddien III, emphasizing royal Islamic leadership",
        optionC: "It signifies the Sultan's political power only",
        optionD: "It is a title given to all Malay rulers",
        correctAnswer: "B",
        explanation: "The title \"Seri Begawan\" honors Sultan Omar Ali Saifuddien III, emphasizing royal Islamic leadership.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "Which factor played a major role in reinforcing Islam as the state religion during the formation of MIB?",
        optionA: "British colonial policies",
        optionB: "Influence of Islamic scholars and Sultan's leadership",
        optionC: "Pressure from neighboring countries",
        optionD: "Economic needs",
        correctAnswer: "B",
        explanation: "The influence of Islamic scholars and Sultan's leadership played a major role in reinforcing Islam as the state religion during the formation of MIB.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What is the role of the Legislative Council under the MIB system?",
        optionA: "It controls the Sultan's decisions",
        optionB: "It is an independent democratic parliament",
        optionC: "It advises the Sultan within the framework of Islamic and Malay customs",
        optionD: "It drafts laws without Sultan's approval",
        correctAnswer: "C",
        explanation: "The Legislative Council advises the Sultan within the framework of Islamic and Malay customs under the MIB system.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "How is the concept of justice understood under MIB?",
        optionA: "Based solely on Western legal principles",
        optionB: "Focused only on adat (custom)",
        optionC: "A balance between Islamic Syariah and Malay adat (customary law)",
        optionD: "Determined by the British legal system",
        correctAnswer: "C",
        explanation: "Justice under MIB is understood as a balance between Islamic Syariah and Malay adat (customary law).",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "Which event symbolized the formal declaration of MIB as the national philosophy of Brunei?",
        optionA: "Signing of the 1959 Constitution",
        optionB: "Brunei's independence from Britain in 1984",
        optionC: "The Sultan's proclamation of MIB on 1 January 1984",
        optionD: "The 1962 Brunei Revolt",
        correctAnswer: "C",
        explanation: "The Sultan's proclamation of MIB on 1 January 1984 symbolized the formal declaration of MIB as the national philosophy of Brunei.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What role did the British Resident play in Brunei before independence?",
        optionA: "Head of religious affairs",
        optionB: "Adviser controlling external and some internal affairs while respecting the Sultan's authority",
        optionC: "Military commander",
        optionD: "Sultan's successor",
        correctAnswer: "B",
        explanation: "The British Resident served as an adviser controlling external and some internal affairs while respecting the Sultan's authority.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "Who was the first Sultan of Brunei?",
        optionA: "Sultan Muhamad Shah",
        optionB: "Sultan Omar Ali Saifuddin",
        optionC: "Sultan Sharif Ali",
        optionD: "Sultan Ahmad",
        correctAnswer: "A",
        explanation: "Sultan Muhamad Shah was the first Sultan of Brunei.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "In what century did Brunei first convert to Islam?",
        optionA: "14th",
        optionB: "19th",
        optionC: "18th",
        optionD: "15th",
        correctAnswer: "A",
        explanation: "Brunei first converted to Islam in the 14th century.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "When was Brunei occupied by the Japanese during World War II?",
        optionA: "World War II from December 16 1941 to June 10 1945",
        optionB: "World War II from Novenber 16 1942 to April 21 1945",
        optionC: "World War ll from December 21 1969 to May 1945",
        optionD: "World War ll from September 11 1939 to June 21 1945",
        correctAnswer: "A",
        explanation: "Brunei was occupied by the Japanese during World War II from December 16 1941 to June 10 1945.",
        subject: "BRUNEI_HISTORY",
        difficulty: "HARD"
    },
    {
        question: "In____________ Brunei was in the Protectarate State?",
        optionA: "1880",
        optionB: "1888",
        optionC: "1543",
        optionD: "1534",
        correctAnswer: "B",
        explanation: "In 1888, Brunei was in the Protectorate State.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "Identify one of the Brook's family member.",
        optionA: "George Washington",
        optionB: "Ferdinand Megallen",
        optionC: "James Brooke",
        optionD: "Donald Duck",
        correctAnswer: "C",
        explanation: "James Brooke was one of the Brooke family members.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "What is the official language of Brunei?",
        optionA: "Spanish",
        optionB: "Malay",
        optionC: "English",
        optionD: "Chinese",
        correctAnswer: "B",
        explanation: "Malay is the official language of Brunei.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "What is the capital city of Brunei?",
        optionA: "Bandar Seri Begawan",
        optionB: "Labuan",
        optionC: "European",
        optionD: "China",
        correctAnswer: "A",
        explanation: "Bandar Seri Begawan is the capital city of Brunei.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    {
        question: "Who was the King that defeated the country of Suluk?",
        optionA: "Sultan Bolkiah",
        optionB: "Sultan Hassanal Bolkiah",
        optionC: "Sultan Abdul Kahar",
        optionD: "Sultan Sharif Ali",
        correctAnswer: "A",
        explanation: "Sultan Bolkiah was the King that defeated the country of Suluk.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What is the Hibiscus flower name in Bahasa Melayu?",
        optionA: "Bunga Raya",
        optionB: "Oregano",
        optionC: "Haibeecoos",
        optionD: "Talim",
        correctAnswer: "A",
        explanation: "Bunga Raya is the Hibiscus flower name in Bahasa Melayu.",
        subject: "GENERAL_MIB",
        difficulty: "MEDIUM"
    },
    {
        question: "What does \"Melayu Islam Beraja\" (MIB) emphasize?",
        optionA: "Democracy and secularism",
        optionB: "Malay culture, Islamic faith, and monarchy",
        optionC: "Socialism and equality",
        optionD: "Western modernization",
        correctAnswer: "B",
        explanation: "MIB emphasizes the three core pillars: Malay culture (Melayu), Islamic faith (Islam), and monarchy system (Beraja).",
        subject: "GENERAL_MIB",
        difficulty: "EASY"
    },
    {
        question: "Who is the head of state in Brunei?",
        optionA: "Prime Minister",
        optionB: "Sultan",
        optionC: "President",
        optionD: "King",
        correctAnswer: "B",
        explanation: "The Sultan is the head of state in Brunei, representing the monarchy system in MIB.",
        subject: "BERAJA_SYSTEM",
        difficulty: "EASY"
    },
    {
        question: "Which language is predominantly spoken in Brunei?",
        optionA: "English",
        optionB: "Mandarin",
        optionC: "Malay",
        optionD: "Arabic",
        correctAnswer: "C",
        explanation: "Malay is the official language and is predominantly spoken in Brunei, representing the Melayu aspect of MIB.",
        subject: "MELAYU_CULTURE",
        difficulty: "EASY"
    },
    {
        question: "When did Brunei gain full independence?",
        optionA: "1950",
        optionB: "1984",
        optionC: "1963",
        optionD: "1990",
        correctAnswer: "B",
        explanation: "Brunei gained full independence on January 1, 1984, from British protection.",
        subject: "BRUNEI_HISTORY",
        difficulty: "EASY"
    },
    // Medium Questions
    {
        question: "Which Sultan built the Kampong Ayer Water Village?",
        optionA: "Sultan Bolkiah",
        optionB: "Sultan Sharif Ali",
        optionC: "Sultan Muhammad Shah",
        optionD: "Sultan Abdul Jalilul Akbar",
        correctAnswer: "A",
        explanation: "Sultan Bolkiah was instrumental in the development of Kampong Ayer, the world's largest water village.",
        subject: "BRUNEI_HISTORY",
        difficulty: "MEDIUM"
    },
    {
        question: "What is the main objective of MIB?",
        optionA: "Promote Westernization",
        optionB: "Strengthen Malay identity, Islamic values, and loyalty to the monarchy",
        optionC: "Encourage secular governance",
        optionD: "Reduce royal authority",
        correctAnswer: "B",
        explanation: "MIB aims to strengthen Malay identity, Islamic values, and loyalty to the monarchy as the foundation of Brunei's society.",
        subject: "GENERAL_MIB",
        difficulty: "MEDIUM"
    },
    {
        question: "Which year was the MIB philosophy officially introduced?",
        optionA: "1960",
        optionB: "1984",
        optionC: "1990",
        optionD: "2000",
        correctAnswer: "B",
        explanation: "The MIB philosophy was officially introduced in 1984, coinciding with Brunei's independence.",
        subject: "GENERAL_MIB",
        difficulty: "MEDIUM"
    },
    // Hard Questions
    {
        question: "Which Sultan introduced the first Islamic legal code in Brunei?",
        optionA: "Sultan Muhammad Shah",
        optionB: "Sultan Sharif Ali",
        optionC: "Sultan Bolkiah",
        optionD: "Sultan Abdul Jalilul Akbar",
        correctAnswer: "B",
        explanation: "Sultan Sharif Ali introduced the first Islamic legal code in Brunei, establishing the foundation of Islamic law in the country.",
        subject: "ISLAMIC_VALUES",
        difficulty: "HARD"
    },
    {
        question: "What is the Malay term for the Islamic concept of \"consultation\" in governance?",
        optionA: "Musyawarah",
        optionB: "Fatwa",
        optionC: "Ijtihad",
        optionD: "Taqlid",
        correctAnswer: "A",
        explanation: "Musyawarah refers to the Islamic concept of consultation in decision-making and governance.",
        subject: "ISLAMIC_VALUES",
        difficulty: "HARD"
    }
];
async function main() {
    console.log('🌱 Starting database seeding...');
    // Create admin user (upsert to handle existing data)
    const adminPassword = await bcryptjs_1.default.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@barunah.com' },
        update: {},
        create: {
            email: 'admin@barunah.com',
            username: 'admin',
            password: adminPassword,
            fullName: 'System Administrator',
            role: 'ADMIN'
        }
    });
    // Create sample student (upsert to handle existing data)
    const studentPassword = await bcryptjs_1.default.hash('student123', 10);
    const student = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            email: 'student@example.com',
            username: 'student1',
            password: studentPassword,
            fullName: 'Test Student',
            role: 'STUDENT',
            school: 'Chung Hwa Middle School BSB',
            grade: 'Year 5',
            knowledgePoints: 0,
            level: 1
        }
    });
    // Create student stats (upsert to handle existing data)
    await prisma.userStats.upsert({
        where: { userId: student.id },
        update: {},
        create: {
            userId: student.id
        }
    });
    // Create sample vendor (upsert to handle existing data)
    const vendorPassword = await bcryptjs_1.default.hash('vendor123', 10);
    const vendor = await prisma.user.upsert({
        where: { email: 'vendor@example.com' },
        update: {},
        create: {
            email: 'vendor@example.com',
            username: 'vendor1',
            password: vendorPassword,
            fullName: 'Test Vendor',
            role: 'VENDOR',
            businessName: 'Barunah Rewards Store',
            businessType: 'Education Supplies',
            contactPhone: '+673-1234567'
        }
    });
    // Insert questions (skip if they exist)
    for (const question of questions) {
        try {
            await prisma.question.create({
                data: {
                    ...question,
                    subject: question.subject,
                    difficulty: question.difficulty
                }
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                console.log(`Question already exists: ${question.question.substring(0, 50)}...`);
            }
            else {
                throw error;
            }
        }
    }
    // Create sample rewards (skip if they exist)
    const rewards = [
        {
            title: 'Pencil Set',
            description: 'Set of 12 colored pencils',
            knowledgePointsCost: 100,
            category: 'Stationery',
            stockQuantity: 50,
            vendorId: vendor.id
        },
        {
            title: '20% Discount Voucher',
            description: '20% off on any stationery purchase',
            knowledgePointsCost: 200,
            category: 'Discount',
            stockQuantity: 100,
            vendorId: vendor.id
        },
        {
            title: 'Notebook',
            description: 'Premium quality notebook',
            knowledgePointsCost: 150,
            category: 'Stationery',
            stockQuantity: 30,
            vendorId: vendor.id
        }
    ];
    for (const reward of rewards) {
        try {
            await prisma.reward.create({
                data: reward
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                console.log(`Reward already exists: ${reward.title}`);
            }
            else {
                throw error;
            }
        }
    }
    // Create sample pets (skip if they exist)
    const pets = [
        {
            name: 'Harimau Malaya',
            description: 'A brave tiger representing courage',
            imageUrl: '/images/pets/tiger.png',
            rarity: 'Common',
            knowledgePointsCost: 300,
            abilities: ['Courage Boost', 'Extra KP']
        },
        {
            name: 'Burung Enggang',
            description: 'A wise hornbill representing wisdom',
            imageUrl: '/images/pets/hornbill.png',
            rarity: 'Rare',
            knowledgePointsCost: 500,
            abilities: ['Wisdom Boost', 'Time Extension']
        },
        {
            name: 'Kancil',
            description: 'A clever mousedeer representing intelligence',
            imageUrl: '/images/pets/mousedeer.png',
            rarity: 'Epic',
            knowledgePointsCost: 800,
            abilities: ['Intelligence Boost', 'Shield Protection']
        }
    ];
    for (const pet of pets) {
        try {
            await prisma.pet.create({
                data: pet
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                console.log(`Pet already exists: ${pet.name}`);
            }
            else {
                throw error;
            }
        }
    }
    // Create sample boss (skip if it exists)
    try {
        await prisma.boss.create({
            data: {
                name: 'Guardian of Knowledge',
                description: 'The final challenge to test your MIB knowledge',
                imageUrl: '/images/boss/guardian.png',
                baseHp: 100,
                hpPerLevel: 50,
                difficulty: 'MEDIUM'
            }
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            console.log('Boss already exists: Guardian of Knowledge');
        }
        else {
            throw error;
        }
    }
    console.log('✅ Database seeding completed!');
    console.log('👤 Admin user created: admin@barunah.com / admin123');
    console.log('🎓 Student user created: student@example.com / student123');
    console.log('🏪 Vendor user created: vendor@example.com / vendor123');
    console.log(`📚 ${questions.length} questions added`);
    console.log('🎁 Sample rewards and pets created');
}
main()
    .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
