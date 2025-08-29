import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const questions = [
  {
    "question": "Who is the Sutan during Brunei's Golden age",
    "optionA": "Sultan Sharif Ali",
    "optionB": "Sultan Hassanal Bolkiah",
    "optionC": "Sultan Sultan Sharif Ali 2",
    "optionD": "Sultan Bolkiah",
    "correctAnswer": "D",
    "explanation": "Sultan Bolkiah is a good Sultan,he conquered so many plot and let Brunei peace",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "According to the traditional historyof Brunei, the earliest settlement was believed to be located in______________.",
    "optionA": "tutong",
    "optionB": "garang",
    "optionC": "belait",
    "optionD": "temburong",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "When was the district Advisory Council was establish?",
    "optionA": "1953",
    "optionB": "1999",
    "optionC": "1955",
    "optionD": "1908",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "When did Sultan Hashim Jalilul Alam Aqamadin pass away?",
    "optionA": "1989",
    "optionB": "1945",
    "optionC": "1906",
    "optionD": "1955",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What was one of the nicknames for Brunei from the Europeans",
    "optionA": "temburong",
    "optionB": "muara",
    "optionC": "belait",
    "optionD": "borney",
    "correctAnswer": "D",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "In what year did the Spanish ship arrived in Brunei Town?",
    "optionA": "1578",
    "optionB": "1581",
    "optionC": "1598",
    "optionD": "1986",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "A loteng was a well-floored attic that was used as what?",
    "optionA": "bedroom",
    "optionB": "living room",
    "optionC": "toilet",
    "optionD": "movie room",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "This type of stilt house was very popular in the brunei water villages and was normally built by what?",
    "optionA": "brunei commoners",
    "optionB": "tutong commoners",
    "optionC": "belait commoners",
    "optionD": "temburong commoners",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Belanggar house was commonly built in the Brunei water viligers in what year?",
    "optionA": "1955",
    "optionB": "1950",
    "optionC": "1999",
    "optionD": "1988",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "In what boat can aaccomodate three to five passengers?",
    "optionA": "temburong boat",
    "optionB": "belait boat",
    "optionC": "gubang boat",
    "optionD": "muara boat",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which village was renowned for its expertise in broadcasting?",
    "optionA": "Kampong Ayer",
    "optionB": "Kampong Muara",
    "optionC": "Kampong Belait",
    "optionD": "Kampong Ujong Bukit",
    "correctAnswer": "D",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What materials were traditionally used to make the thatched roof of a Brunei Malay house?",
    "optionA": "nipah",
    "optionB": "coconut tree",
    "optionC": "apple tree",
    "optionD": "avocado tree",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "How many brothers did Sultan Muhammad Shah have?",
    "optionA": "1",
    "optionB": "8",
    "optionC": "13",
    "optionD": "20",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Where did Sultan Sharif Ali come from?",
    "optionA": "UK",
    "optionB": "China",
    "optionC": "Saudi Arabia",
    "optionD": "Brunei Darussalam",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "Which Sultan is credited with introducing Islamic law in Brunei?",
    "optionA": "2004",
    "optionB": "1984",
    "optionC": "1967",
    "optionD": "1959",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What is the main purpose of the MIB philosophy?",
    "optionA": "To modernize Brunei",
    "optionB": "To guide national development based on Bruneian identity",
    "optionC": "To promote tourism",
    "optionD": "To separate religion and government",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What year was the Melayu Islam Beraja (MIB) philosophy officially declared?",
    "optionA": "1959",
    "optionB": "1967",
    "optionC": "1984",
    "optionD": "2004",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Who is known as the “Architect of Modern Brunei”?",
    "optionA": "Sultan Bolkiah (5th Sultan)",
    "optionB": "Sultan Sharif Ali",
    "optionC": "Sultan Omar Ali Saifuddien III",
    "optionD": "Sultan Muhammad Shah",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which war led to the Japanese occupation of Brunei?",
    "optionA": "World War I",
    "optionB": "Brunei Civil War",
    "optionC": "World War II",
    "optionD": "Borneo Uprising",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "When did Brunei officially regain its independence from British protection?",
    "optionA": "1963",
    "optionB": "1984",
    "optionC": "1971",
    "optionD": "1959",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which treaty marked the beginning of British protection over Brunei in 1888?",
    "optionA": "Treaty of Paris",
    "optionB": "Treaty of Protection",
    "optionC": "Treaty of Independence",
    "optionD": "Treaty of London",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "Who is considered the architect of Brunei's modern MIB philosophy?",
    "optionA": "Sultan Haji Hassanal Bolkiah",
    "optionB": "Sultan Muhammad Shah",
    "optionC": "Sultan Jamalul Alam",
    "optionD": "Pengiran Muda Hashim",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What year did the MIB concept officially become the national philosophy of Brunei?",
    "optionA": "1959",
    "optionB": "1984",
    "optionC": "1992",
    "optionD": "1971",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which Sultan of Brunei was instrumental in signing the 1959 Constitution that marked internal self-governance?",
    "optionA": "Sultan Hassanal Bolkiah",
    "optionB": "Sultan Omar Ali Saifuddien III",
    "optionC": "Sultan Ahmad Tajuddin",
    "optionD": "Sultan Muhammad Jamalul Alam",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the significance of Sultan Sharif Ali’s reign in shaping Brunei's Islamic identity within the MIB philosophy?",
    "optionA": "He introduced the Jawi script",
    "optionB": "He was the first Sultan to fully implement Islamic law and build mosques",
    "optionC": "He signed a treaty with the Ottomans",
    "optionD": "He translated the Quran into Malay",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "How did the 1888 Treaty of Protection affect Brunei’s sovereignty in the context of MIB?",
    "optionA": "It enhanced Brunei’s Islamic governance",
    "optionB": "It dissolved the monarchy temporarily",
    "optionC": "It preserved internal Islamic and monarchical structures while surrendering foreign affairs to Britain",
    "optionD": "It unified Brunei with Sabah under British rule",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "How does the concept of Daulat (sovereignty) under MIB differ from Western secular constitutionalism?",
    "optionA": "Daulat is limited by the constitution, similar to constitutional monarchies",
    "optionB": "Daulat under MIB is symbolic and has no legal authority",
    "optionC": "Daulat under MIB is divine-right based, blending Islamic legitimacy with traditional Malay monarchy",
    "optionD": "Daulat refers only to Brunei’s international sovereignty, not domestic leadership",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "Which philosophical tension exists within the MIB framework when balancing Islamic law and Malay adat (custom)",
    "optionA": "Adat fully overrides Syariah in Brunei courts",
    "optionB": "Some adat practices predate Islam and require reinterpretation to align with Syariah principles",
    "optionC": "Adat is considered irrelevant in MIB governance",
    "optionD": "There is no conflict; adat and Syariah are the same",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "In pre-modern Brunei, which legal system coexisted with Islamic jurisprudence and later became subsumed under the MIB philosophy?",
    "optionA": "English common law",
    "optionB": "Malay customary law (Undang-Undang Adat Melayu)",
    "optionC": "Hindu-Buddhist Dharmasastra codes",
    "optionD": "Roman-Dutch law",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "Which Sultan was responsible for the signing of the 1959 Constitution that laid the groundwork for Brunei’s self-governance",
    "optionA": "Sultan Muhammad Jamalul Alam",
    "optionB": "Sultan Hassanal Bolkiah",
    "optionC": "Sultan Omar Ali Saifuddien III",
    "optionD": "Sultan Ahmad Tajuddin",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What was a key effect of the 1888 Treaty of Protection between Brunei and Britain?",
    "optionA": "Abolished the monarchy",
    "optionB": "Made Brunei a full British colony",
    "optionC": "Britain took control of Brunei’s foreign affairs but left internal matters to the Sultan",
    "optionD": "Merged Brunei with Sarawak",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What was the main objective of the 1959 Brunei Constitution in relation to MIB?",
    "optionA": "To abolish the monarchy",
    "optionB": "To introduce a secular government",
    "optionC": "To establish Brunei as an Islamic constitutional monarchy",
    "optionD": "To join Brunei with Malaysia",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which ethnic group primarily shapes the \"Malay\" identity in the Melayu Islam Beraja philosophy?",
    "optionA": "Javanese",
    "optionB": "Bugis",
    "optionC": "Bruneian Malays",
    "optionD": "Minangkabau",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What is the significance of the Sultan’s title “Seri Begawan” in relation to MIB?",
    "optionA": "It means \"Warrior King\"",
    "optionB": "It honors Sultan Omar Ali Saifuddien III, emphasizing royal Islamic leadership",
    "optionC": "It signifies the Sultan’s political power only",
    "optionD": "It is a title given to all Malay rulers",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which factor played a major role in reinforcing Islam as the state religion during the formation of MIB?",
    "optionA": "British colonial policies",
    "optionB": "Influence of Islamic scholars and Sultan’s leadership",
    "optionC": "Pressure from neighboring countries",
    "optionD": "Economic needs",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the role of the Legislative Council under the MIB system?",
    "optionA": "It controls the Sultan’s decisions",
    "optionB": "It is an independent democratic parliament",
    "optionC": "It advises the Sultan within the framework of Islamic and Malay customs",
    "optionD": "It drafts laws without Sultan’s approval",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "How is the concept of justice understood under MIB?",
    "optionA": "Based solely on Western legal principles",
    "optionB": "Focused only on adat (custom)",
    "optionC": "A balance between Islamic Syariah and Malay adat (customary law)",
    "optionD": "Determined by the British legal system",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which event symbolized the formal declaration of MIB as the national philosophy of Brunei?",
    "optionA": "Signing of the 1959 Constitution",
    "optionB": "Brunei’s independence from Britain in 1984",
    "optionC": "The Sultan’s proclamation of MIB on 1 January 1984",
    "optionD": "The 1962 Brunei Revolt",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What role did the British Resident play in Brunei before independence?",
    "optionA": "Head of religious affairs",
    "optionB": "Adviser controlling external and some internal affairs while respecting the Sultan’s authority",
    "optionC": "Military commander",
    "optionD": "Sultan’s successor",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What materials were traditionally used to build a Dusun house?",
    "optionA": "Softwood",
    "optionB": "Bamboo",
    "optionC": "Hardwood",
    "optionD": "Tree bark",
    "correctAnswer": "D",
    "explanation": "",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the source of Kawang juice?",
    "optionA": "Coconut juice mixed with lime",
    "optionB": "Rice water and lemon",
    "optionC": "A type of summer fruit",
    "optionD": "A type of winged fruit",
    "correctAnswer": "D",
    "explanation": "",
    "subject": "MELAYU_CULTURE",
    "difficulty": "HARD"
  },
  {
    "question": "Traditional Kedayan houses were commonly shared by which family members?",
    "optionA": "Close Family",
    "optionB": "Cousins",
    "optionC": "Extended Family",
    "optionD": "Aunts and Uncles",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "Who held the title of the fifth Sultan of Brunei?",
    "optionA": "Sultan Bolkiah",
    "optionB": "Sultan Haji Hassanal Bolkiah",
    "optionC": "Sultan Sulaiman",
    "optionD": "Sultan Ahmad",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which country hosted the 6th Intra-ASEAN Archaeological Excavation Workshop?",
    "optionA": "Singapore's Excavational Site",
    "optionB": "Brunei's Excavational Site",
    "optionC": "Australia's Excavational Site",
    "optionD": "Malaysia's Excavational Site",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which Kampong was renowned for its expertise in brass-cutting?",
    "optionA": "Kampong Ujong Bukit",
    "optionB": "Kampong Lurong Sikuna",
    "optionC": "Kampong Bukit Salat",
    "optionD": "Kampong  Sungai Kedayan",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Candasan Buah Kawang refers to a type of pressing machine used for __________.",
    "optionA": "Crushing limestone for construction",
    "optionB": "Grinding spices into powder",
    "optionC": "Pressing sugarcane for juice",
    "optionD": "Extracting oil from palm fruits",
    "correctAnswer": "D",
    "explanation": "",
    "subject": "MELAYU_CULTURE",
    "difficulty": "HARD"
  },
  {
    "question": "Among the traditional crafts in the water villages of__________, silversmithing held a place of high regard",
    "optionA": "Inle Lake, Myanmar",
    "optionB": "Tonle Sap, Cambodia",
    "optionC": "Halong Bay, Vietnam",
    "optionD": "Kampong Ayer, Brunei",
    "correctAnswer": "D",
    "explanation": "",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "For how long can a 'salong' lamp remain illuminated without interruption?",
    "optionA": "5 days",
    "optionB": "10 days",
    "optionC": "14 days",
    "optionD": "3 days",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "Who was the first Sultan of Brunei?",
    "optionA": "Sultan Muhamad Shah",
    "optionB": "Sultan Omar Ali Saifuddin",
    "optionC": "Sultan Sharif Ali",
    "optionD": "Sultan Ahmad",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "In what century did Brunei first convert to Islam?",
    "optionA": "14th",
    "optionB": "19th",
    "optionC": "18th",
    "optionD": "15th",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "When was Brunei occupied by the Japanese during World War II?",
    "optionA": "World War II from December 16 1941 to June 10 1945",
    "optionB": "World War II from Novenber 16 1942 to April 21 1945",
    "optionC": "World War ll from December 21 1969 to May 1945",
    "optionD": "World War ll from September 11 1939 to June 21 1945",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "In____________ Brunei was in the Protectarate State?",
    "optionA": "1880",
    "optionB": "1888",
    "optionC": "1543",
    "optionD": "1534",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Identify one of the Brook's family member.",
    "optionA": "George Washington",
    "optionB": "Ferdinand Megallen",
    "optionC": "James Brooke",
    "optionD": "Donald Duck",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What is the official language of Brunei?",
    "optionA": "Spanish",
    "optionB": "Malay",
    "optionC": "English",
    "optionD": "Chinese",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What is the capital city of Brunei?",
    "optionA": "Bandar Seri Begawan",
    "optionB": "Labuan",
    "optionC": "European",
    "optionD": "China",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "When was oil discovered?",
    "optionA": "20th",
    "optionB": "12th",
    "optionC": "19th",
    "optionD": "13th",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Who is the current Sultan of Brunei?",
    "optionA": "Sultan Sharif Ali",
    "optionB": "Sultan Hassanal Bolkiah",
    "optionC": "Sultan Omar Ali Saifuddin",
    "optionD": "Sultan Ahmad",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which religion is most practiced in Brunei?",
    "optionA": "Islam",
    "optionB": "Chinese",
    "optionC": "Spanish",
    "optionD": "English",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What is Brunei’s official currency?",
    "optionA": "Ringgit",
    "optionB": "Dollar",
    "optionC": "Rupee",
    "optionD": "Yen",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "When did Brunei become an independent country?",
    "optionA": "January 1 1984",
    "optionB": "May 4 1999",
    "optionC": "September 11 1935",
    "optionD": "October 15 1947",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "In 1775, Brunei managed to produce up to ___ pikuls of black pepper.",
    "optionA": "800",
    "optionB": "400",
    "optionC": "100",
    "optionD": "300",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Prior to the 15th century AD, the worth of _____ was considered more precious than gold and jewels.",
    "optionA": "silver",
    "optionB": "copper",
    "optionC": "spices",
    "optionD": "diamonds",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "\"Allow _____ to guide your __________, and let your __________ lead your __________.\"",
    "optionA": "food, medicine, food, medicine",
    "optionB": "medicine, food, medicine, food",
    "optionC": "medicine, food, food ,medicine",
    "optionD": "food, food, medicine, medicine",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "GENERAL_MIB",
    "difficulty": "HARD"
  },
  {
    "question": "An intriguing inscription marking the inception of diplomatic ties between Brunei and China is documented atop a turtle's shell, famously referred to as the __________________________.",
    "optionA": "Royal Turtle",
    "optionB": "Royal Bixi",
    "optionC": "Royal Brunei",
    "optionD": "Royal China",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "What sport does Sultan Hassanal Bolkiah enjoy the most?",
    "optionA": "golf",
    "optionB": "polo",
    "optionC": "rowing boats",
    "optionD": "riding bicycles",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "_________ refers to a residence traditionally constructed for Brunei Malay aristocrats and esteemed dignitaries.",
    "optionA": "Rumah Belah Bubung",
    "optionB": "Tunkup House",
    "optionC": "Rumah Berloteng",
    "optionD": "Rumah Belalang",
    "correctAnswer": "B",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The term \"Potong Limas\" signifies _______.",
    "optionA": "five",
    "optionB": "cut five pieces",
    "optionC": "cut into five",
    "optionD": "cut",
    "correctAnswer": "C",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "_______________ served as a common means of transportation in water-based villages.",
    "optionA": "Perahu Layar",
    "optionB": "Perahu",
    "optionC": "kapal",
    "optionD": "kapal terbang",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "What do we call a fishing trap specifically designed for fast-moving waters, typically positioned near where a river flows into the sea?",
    "optionA": "Tugu",
    "optionB": "Menenun Kain",
    "optionC": "Perahu Layar",
    "optionD": "jala",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Who was the King that defeated the country of Suluk?",
    "optionA": "Sultan Bolkiah",
    "optionB": "Sultan Hassanal Bolkiah",
    "optionC": "Sultan Abdul Kahar",
    "optionD": "Sultan Sharif Ali",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the Hibiscus flower name in Bahasa Melayu",
    "optionA": "Bunga Raya",
    "optionB": "Oregano",
    "optionC": "Haibeecoos",
    "optionD": "Talim",
    "correctAnswer": "A",
    "explanation": "",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What does 'Melayu Islam Beraja' (MIB) translate to in English?",
    "optionA": "Malay Islamic Monarchy",
    "optionB": "Malaysian Islamic Brotherhood",
    "optionC": "Monarchical Islamic Brunei",
    "optionD": "Malay Identity of Brunei",
    "correctAnswer": "A",
    "explanation": "MIB is the national philosophy of Brunei, standing for Malay Islamic Monarchy.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which Sultan is known as the 'Father of Independence' for his efforts in securing Brunei's sovereignty?",
    "optionA": "Sultan Hassanal Bolkiah",
    "optionB": "Sultan Omar Ali Saifuddien III",
    "optionC": "Sultan Sharif Ali",
    "optionD": "Sultan Bolkiah",
    "correctAnswer": "B",
    "explanation": "Sultan Omar Ali Saifuddien III negotiated the 1959 Constitution and laid the groundwork for full independence.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The Brunei constitution states that the Sultan must always be a member of which faith?",
    "optionA": "Christianity",
    "optionB": "Buddhism",
    "optionC": "Islam",
    "optionD": "Hinduism",
    "correctAnswer": "C",
    "explanation": "The Sultanate is an Islamic institution, and the Sultan is the head of the Islamic faith in Brunei.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "What is the name of the national anthem of Brunei?",
    "optionA": "Negaraku",
    "optionB": "Allah Peliharakan Sultan",
    "optionC": "Bendera Negara",
    "optionD": "Sebangun dan Searah",
    "correctAnswer": "B",
    "explanation": "'Allah Peliharakan Sultan' translates to 'God Bless the Sultan' and is the national anthem.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "In which year was the Treaty of Protection signed, making Brunei a British protectorate?",
    "optionA": "1888",
    "optionB": "1906",
    "optionC": "1959",
    "optionD": "1984",
    "correctAnswer": "A",
    "explanation": "The 1888 Treaty placed Brunei under British protection, handling its foreign affairs.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the famous floating village in Brunei?",
    "optionA": "Kampong Belait",
    "optionB": "Kampong Ayer",
    "optionC": "Kampong Muara",
    "optionD": "Kampong Tutong",
    "correctAnswer": "B",
    "explanation": "Kampong Ayer is a historical settlement comprising houses built on stilts over the Brunei River.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which important document did Sultan Omar Ali Saifuddien III introduce in 1959?",
    "optionA": "The Treaty of Protection",
    "optionB": "The Brunei Constitution",
    "optionC": "The Declaration of Independence",
    "optionD": "The MIB Proclamation",
    "correctAnswer": "B",
    "explanation": "The 1959 Constitution established internal self-governance and is a key document in Brunei's history.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the primary purpose of the MIB philosophy?",
    "optionA": "To promote tourism",
    "optionB": "To guide national development based on Bruneian identity",
    "optionC": "To create a military alliance",
    "optionD": "To replace Malay customs",
    "correctAnswer": "B",
    "explanation": "MIB serves as the guiding principle for Brunei's development, preserving its unique identity as a Malay Islamic Monarchy.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which Sultan built the famous Omar Ali Saifuddien Mosque?",
    "optionA": "Sultan Hassanal Bolkiah",
    "optionB": "Sultan Omar Ali Saifuddien III",
    "optionC": "Sultan Sharif Ali",
    "optionD": "Sultan Bolkiah",
    "correctAnswer": "B",
    "explanation": "Sultan Omar Ali Saifuddien III commissioned the mosque, which is named after him.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "What is the title given to the Crown Prince of Brunei?",
    "optionA": "Pengiran Muda Mahkota",
    "optionB": "Pengiran Bendahara",
    "optionC": "Pengiran Di-Gadong",
    "optionD": "Pengiran Pemancha",
    "correctAnswer": "A",
    "explanation": "'Pengiran Muda Mahkota' is the official title for the Crown Prince.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "When is the National Day of Brunei celebrated?",
    "optionA": "1 January",
    "optionB": "23 February",
    "optionC": "15 July",
    "optionD": "29 September",
    "correctAnswer": "B",
    "explanation": "Brunei celebrates its National Day on February 23rd, commemorating its independence from Britain in 1984.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these is a traditional Malay art of self-defense?",
    "optionA": "Silat",
    "optionB": "Karate",
    "optionC": "Taekwondo",
    "optionD": "Kung Fu",
    "correctAnswer": "A",
    "explanation": "Silat is a traditional Malay martial art that is also practiced in Brunei.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "What is the name of the traditional woven fabric of Brunei?",
    "optionA": "Batik",
    "optionB": "Songket",
    "optionC": "Silk",
    "optionD": "Ikat",
    "correctAnswer": "B",
    "explanation": "Songket is a luxurious fabric woven with gold or silver threads, a prized traditional craft.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "In the MIB context, 'Beraja' refers to the system of:",
    "optionA": "Democracy",
    "optionB": "Monarchy",
    "optionC": "Republic",
    "optionD": "Anarchy",
    "correctAnswer": "B",
    "explanation": "'Beraja' directly translates to 'monarchy', which is a core pillar of the MIB philosophy.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which body advises the Sultan on the Islamic religion?",
    "optionA": "The Legislative Council",
    "optionB": "The Privy Council",
    "optionC": "The Religious Council",
    "optionD": "The Council of Ministers",
    "correctAnswer": "C",
    "explanation": "The Religious Council (Majlis Ugama Islam) is the primary advisor on all Islamic matters.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the Islamic university in Brunei?",
    "optionA": "Universiti Brunei Darussalam",
    "optionB": "Universiti Islam Sultan Sharif Ali",
    "optionC": "Institut Teknologi Brunei",
    "optionD": "Universiti Teknologi Brunei",
    "correctAnswer": "B",
    "explanation": "Universiti Islam Sultan Sharif Ali (UNISSA) is a university focused on Islamic studies.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which of these is a traditional Malay game often played during festivities?",
    "optionA": "Football",
    "optionB": "Basketball",
    "optionC": "Gasing",
    "optionD": "Tennis",
    "correctAnswer": "C",
    "explanation": "Gasing, or top-spinning, is a traditional game requiring skill to spin a large wooden top.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the official name of the country?",
    "optionA": "Brunei",
    "optionB": "State of Brunei",
    "optionC": "Brunei Darussalam",
    "optionD": "Nation of Brunei",
    "correctAnswer": "C",
    "explanation": "The full name is Negara Brunei Darussalam, which means 'The Country of Brunei, Abode of Peace'.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these is NOT one of the four districts of Brunei?",
    "optionA": "Belait",
    "optionB": "Tutong",
    "optionC": "Temburong",
    "optionD": "Muara",
    "correctAnswer": "D",
    "explanation": "The four districts are Brunei-Muara, Tutong, Belait, and Temburong. Muara is a town within Brunei-Muara district.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "What is the main ingredient in the Bruneian dish 'Ambuyat'?",
    "optionA": "Rice",
    "optionB": "Sago",
    "optionC": "Wheat",
    "optionD": "Tapioca",
    "correctAnswer": "B",
    "explanation": "Ambuyat is made from the interior trunk of the sago palm, creating a glutinous starch.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Who was the first British Resident appointed to Brunei?",
    "optionA": "James Brooke",
    "optionB": "Charles Brooke",
    "optionC": "Malcolm McArthur",
    "optionD": "William Hood Treacher",
    "correctAnswer": "C",
    "explanation": "Malcolm McArthur was appointed as the first British Resident in Brunei in 1906.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "The concept of 'Daulat' in the Malay Monarchy system refers to:",
    "optionA": "Wealth",
    "optionB": "Sovereignty and the divine right to rule",
    "optionC": "Land ownership",
    "optionD": "Military power",
    "correctAnswer": "B",
    "explanation": "'Daulat' embodies the idea that the Sultan's sovereignty is sacred and bestowed by divine right.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "HARD"
  },
  {
    "question": "Which Sultanate era is often referred to as the 'Golden Age' of Brunei?",
    "optionA": "Sultan Sharif Ali",
    "optionB": "Sultan Bolkiah",
    "optionC": "Sultan Hassan",
    "optionD": "Sultan Muhammad Shah",
    "correctAnswer": "B",
    "explanation": "Sultan Bolkiah's reign (5th Sultan) was marked by vast territorial expansion and economic prosperity.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the code of conduct for royal subjects that emphasizes loyalty and obedience?",
    "optionA": "Undang-Undang",
    "optionB": "Kesetiaan",
    "optionC": "Taat Setia",
    "optionD": "Adat Istiadat",
    "correctAnswer": "C",
    "explanation": "'Taat Setia' translates to loyalty and obedience, a key principle for subjects in the monarchy.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which famous explorer's voyage included a visit to Brunei in the 16th century?",
    "optionA": "Christopher Columbus",
    "optionB": "Marco Polo",
    "optionC": "Ferdinand Magellan",
    "optionD": "Vasco da Gama",
    "correctAnswer": "C",
    "explanation": "Antonio Pigafetta, a scholar on Magellan's expedition, documented a visit to Brunei in 1521.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the primary source of income for Brunei?",
    "optionA": "Tourism",
    "optionB": "Agriculture",
    "optionC": "Oil and Natural Gas",
    "optionD": "Manufacturing",
    "correctAnswer": "C",
    "explanation": "Brunei's economy is heavily reliant on revenues from crude oil and natural gas exports.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "The phrase 'Allah Peliharakan Sultan' means:",
    "optionA": "Long Live the Sultan",
    "optionB": "God Bless the Sultan",
    "optionC": "Sultan is Great",
    "optionD": "Praise the Sultan",
    "correctAnswer": "B",
    "explanation": "This is the title and key phrase of the national anthem.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these is a traditional ceremony marking a royal birthday?",
    "optionA": "Hari Raya",
    "optionB": "Maulidur Rasul",
    "optionC": "Istana Open House",
    "optionD": "Jerayawara",
    "correctAnswer": "C",
    "explanation": "The Istana (Palace) holds a massive open house for the public during the Sultan's birthday celebrations.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the traditional headgear for Malay men?",
    "optionA": "Tudung",
    "optionB": "Songkok",
    "optionC": "Serban",
    "optionD": "Kopiah",
    "correctAnswer": "B",
    "explanation": "The songkok is a cap traditionally worn by Muslim men in Brunei and the region.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "In which year did the Brunei Rebellion occur?",
    "optionA": "1959",
    "optionB": "1962",
    "optionC": "1984",
    "optionD": "1991",
    "correctAnswer": "B",
    "explanation": "The Brunei Rebellion was an armed uprising against the monarchy and the British in December 1962.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "What is the highest honour awarded by the Sultan of Brunei?",
    "optionA": "Darjah Seri Ugama Islam",
    "optionB": "Darjah Kerabat Laila Utama",
    "optionC": "Darjah Paduka Keberanian Laila Terbilang",
    "optionD": "Darjah Kerabat Mahkota Brunei",
    "correctAnswer": "D",
    "explanation": "The Darjah Kerabat Mahkota Brunei (DKMB) is the highest and most exclusive honour, typically awarded to foreign royalty and heads of state.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Proclamation of Independence' was read by Sultan Hassanal Bolkiah on what date?",
    "optionA": "1 January 1984",
    "optionB": "23 February 1984",
    "optionC": "31 December 1983",
    "optionD": "15 July 1984",
    "correctAnswer": "A",
    "explanation": "The Proclamation of Independence was declared at midnight on January 1, 1984, in the stadium.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which of these titles is NOT a traditional Malay noble title?",
    "optionA": "Pengiran",
    "optionB": "Pehin",
    "optionC": "Dato",
    "optionD": "Shogun",
    "correctAnswer": "D",
    "explanation": "Shogun is a Japanese military title. Pengiran, Pehin, and Dato are traditional Malay titles used in Brunei.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "EASY"
  },
  {
    "question": "What is the name of the Islamic religious council in Brunei?",
    "optionA": "Majlis Mesyuarat Negara",
    "optionB": "Majlis Ugama Islam",
    "optionC": "Majlis Penasihat Keselamatan",
    "optionD": "Majlis Tertinggi",
    "correctAnswer": "B",
    "explanation": "Majlis Ugama Islam is the Islamic Religious Council responsible for advising on religious matters.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which Sultan introduced the first written legal code based on Islamic principles?",
    "optionA": "Sultan Muhammad Shah",
    "optionB": "Sultan Ahmad",
    "optionC": "Sultan Sharif Ali",
    "optionD": "Sultan Hassan",
    "correctAnswer": "C",
    "explanation": "Sultan Sharif Ali, being a descendant of the Prophet Muhammad, was instrumental in strengthening Islamic institutions and law.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Lapau', or Royal Ceremonial Hall, is primarily used for:",
    "optionA": "Public markets",
    "optionB": "Royal weddings and oath-taking ceremonies",
    "optionC": "International conferences",
    "optionD": "Military parades",
    "correctAnswer": "B",
    "explanation": "The Lapau is a traditional building used for royal ceremonies, including the installation of crowns and oath-taking of officials.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What does the white colour on Brunei's national flag symbolize?",
    "optionA": "The Sultan",
    "optionB": "Peace and purity",
    "optionC": "The people",
    "optionD": "Justice",
    "correctAnswer": "B",
    "explanation": "The white band represents the traditional symbol of peace and purity, as well as the chief minister.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which international organization did Brunei join immediately after independence in 1984?",
    "optionA": "United Nations (UN)",
    "optionB": "Organisation of Islamic Cooperation (OIC)",
    "optionC": "ASEAN",
    "optionD": "All of the above",
    "correctAnswer": "D",
    "explanation": "Brunei joined the UN, OIC, and ASEAN in quick succession in 1984 as part of establishing its international presence.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Adat Istiadat' refers to:",
    "optionA": "Islamic law",
    "optionB": "British common law",
    "optionC": "Malay customs and royal traditions",
    "optionD": "The constitution",
    "correctAnswer": "C",
    "explanation": "Adat Istiadat encompasses the complex system of Malay customs, etiquette, and royal court traditions.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the main language of instruction in Bruneian schools?",
    "optionA": "English",
    "optionB": "Arabic",
    "optionC": "Malay",
    "optionD": "Mandarin",
    "correctAnswer": "C",
    "explanation": "Bahasa Melayu (Malay) is the national language and the primary medium of instruction in the national education system.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these is a traditional musical instrument of Brunei?",
    "optionA": "Gulintangan",
    "optionB": "Guitar",
    "optionC": "Piano",
    "optionD": "Violin",
    "correctAnswer": "A",
    "explanation": "The Gulintangan is a set of small, horizontal gongs played in traditional Bruneian music ensembles.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Taman Haji Sir Muda Omar Ali Saifuddien' is a prominent:",
    "optionA": "Mosque",
    "optionB": "Palace",
    "optionC": "Waterfront park",
    "optionD": "University",
    "correctAnswer": "C",
    "explanation": "This is a large public park and ceremonial ground in the heart of Bandar Seri Begawan, named after the late Sultan.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "What is the name of the code of conduct that emphasizes respect for elders and community harmony?",
    "optionA": "Syariah",
    "optionB": "Adat",
    "optionC": "Hukum",
    "optionD": "Undang-Undang",
    "correctAnswer": "B",
    "explanation": "Adat refers to the customary laws and social codes that govern behaviour and community relations.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which Sultan signed the agreement that led to the discovery of oil in Brunei?",
    "optionA": "Sultan Hashim Jalilul Alam Aqamaddin",
    "optionB": "Sultan Ahmad Tajuddin",
    "optionC": "Sultan Muhammad Jamalul Alam II",
    "optionD": "Sultan Omar Ali Saifuddien III",
    "correctAnswer": "C",
    "explanation": "Sultan Muhammad Jamalul Alam II signed the agreement with the British Malayan Petroleum Company in 1922.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Ministry of Religious Affairs' is responsible for the administration of:",
    "optionA": "Oil and gas",
    "optionB": "Defence",
    "optionC": "Islamic affairs and Haj pilgrimage",
    "optionD": "Foreign trade",
    "correctAnswer": "C",
    "explanation": "This ministry oversees mosques, religious schools, the dissemination of Islamic teachings, and the Haj pilgrimage.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "What is the traditional attire for Malay women called?",
    "optionA": "Baju Kurung",
    "optionB": "Sari",
    "optionC": "Kebaya",
    "optionD": "Cheongsam",
    "correctAnswer": "A",
    "explanation": "The Baju Kurung is a traditional dress consisting of a long blouse and skirt, widely worn by Malay women.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Dewan Bahasa dan Pustaka' Library is a national institution for:",
    "optionA": "Oil research",
    "optionB": "Language and literature",
    "optionC": "Military history",
    "optionD": "Islamic finance",
    "correctAnswer": "B",
    "explanation": "Dewan Bahasa dan Pustaka is responsible for promoting and developing the Malay language and literature.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which famous Islamic scholar from the Middle East is known to have visited historical Brunei?",
    "optionA": "Ibn Battuta",
    "optionB": "Al-Ghazali",
    "optionC": "Ibn Sina",
    "optionD": "Al-Farabi",
    "correctAnswer": "A",
    "explanation": "The renowned Moroccan traveller and scholar Ibn Battuta mentioned Brunei (which he called 'Dawakut') in his 14th-century travels.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Sultan Haji Hassanal Bolkiah Foundation' is primarily involved in:",
    "optionA": "Military defence",
    "optionB": "Charitable and welfare activities",
    "optionC": "Oil exploration",
    "optionD": "Political campaigns",
    "correctAnswer": "B",
    "explanation": "The Yayasan Sultan Haji Hassanal Bolkiah is a charitable foundation that funds social, educational, and religious projects.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the traditional Malay martial art?",
    "optionA": "Karate",
    "optionB": "Silat",
    "optionC": "Kung Fu",
    "optionD": "Taekwondo",
    "correctAnswer": "B",
    "explanation": "Silat is a traditional martial art that combines self-defence, dance, and spiritual training, practiced across the Malay Archipelago.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Jerudong Park Playground' was built to celebrate:",
    "optionA": "The discovery of oil",
    "optionB": "The Sultan's 25th anniversary of reign",
    "optionC": "Independence Day",
    "optionD": "ASEAN Summit",
    "correctAnswer": "B",
    "explanation": "The amusement park was a gift from the Sultan to his people to mark his Silver Jubilee in 1992.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which body is responsible for the succession of the Sultan?",
    "optionA": "The Council of Cabinet Ministers",
    "optionB": "The Privy Council",
    "optionC": "The Legislative Council",
    "optionD": "The Religious Council",
    "correctAnswer": "B",
    "explanation": "The Privy Council advises the Sultan on matters including the appointment of the Crown Prince and royal succession.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "HARD"
  },
  {
    "question": "What is the main harvest festival celebrated by the Dusun community in Brunei?",
    "optionA": "Hari Raya",
    "optionB": "Chinese New Year",
    "optionC": "Kaamatan",
    "optionD": "Deepavali",
    "correctAnswer": "C",
    "explanation": "The Kaamatan festival is a traditional harvest festival celebrated by the Dusun people.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Royal Brunei Armed Forces' (RBAF) was formally established in:",
    "optionA": "1959",
    "optionB": "1961",
    "optionC": "1984",
    "optionD": "1991",
    "correctAnswer": "B",
    "explanation": "The RBAF was established on May 31, 1961, initially as the Royal Brunei Malay Regiment.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "What is the name of the Islamic banking system promoted in Brunei?",
    "optionA": "Conventional Banking",
    "optionB": "Syariah Banking",
    "optionC": "Digital Banking",
    "optionD": "Offshore Banking",
    "correctAnswer": "B",
    "explanation": "Syariah-compliant banking operates without interest (riba), in accordance with Islamic principles.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Ulu Temburong National Park' is known for its:",
    "optionA": "Oil fields",
    "optionB": "Ancient palaces",
    "optionC": "Pristine rainforest and canopy walk",
    "optionD": "Shopping malls",
    "correctAnswer": "C",
    "explanation": "This park is a center for eco-tourism, featuring pristine primary rainforest and a famous canopy walkway.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which Sultan built the Istana Nurul Iman?",
    "optionA": "Sultan Omar Ali Saifuddien III",
    "optionB": "Sultan Hassanal Bolkiah",
    "optionC": "Sultan Sharif Ali",
    "optionD": "Sultan Bolkiah",
    "correctAnswer": "B",
    "explanation": "The current Sultan, Hassanal Bolkiah, commissioned the palace, which was completed in 1984.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the traditional welcome drink often served to guests?",
    "optionA": "Coffee",
    "optionB": "Teh Tarik",
    "optionC": "Air Batu Campur (ABC)",
    "optionD": "Sirap",
    "correctAnswer": "D",
    "explanation": "Sirap, a sweet rose-flavoured drink, is a common traditional beverage served to welcome guests.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Brunei Shell Petroleum Company' is a joint venture between the Brunei Government and:",
    "optionA": "ExxonMobil",
    "optionB": "Petronas",
    "optionC": "Royal Dutch Shell",
    "optionD": "Chevron",
    "correctAnswer": "C",
    "explanation": "Brunei Shell Petroleum (BSP) is a partnership between the Brunei Government and the Shell group.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which Islamic holiday is celebrated with a feast of sacrifice?",
    "optionA": "Hari Raya Aidilfitri",
    "optionB": "Hari Raya Aidiladha",
    "optionC": "Maulidur Rasul",
    "optionD": "Israk Mikraj",
    "correctAnswer": "B",
    "explanation": "Hari Raya Aidiladha, or the Festival of Sacrifice, commemorates Prophet Ibrahim's willingness to sacrifice his son.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "What is the name of the traditional Malay dagger, a symbol of masculinity?",
    "optionA": "Kris",
    "optionB": "Katana",
    "optionC": "Parang",
    "optionD": "Kerambit",
    "correctAnswer": "A",
    "explanation": "The Kris is a wavy-bladed dagger that is a revered cultural object and symbol of Malay heritage.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Brunei International Airport' is located in:",
    "optionA": "Kuala Belait",
    "optionB": "Tutong",
    "optionC": "Bandar Seri Begawan",
    "optionD": "Seria",
    "correctAnswer": "C",
    "explanation": "The main international airport is located in the capital district of Brunei-Muara.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these values is NOT emphasized in MIB?",
    "optionA": "Loyalty to the Sultan",
    "optionB": "Secularism",
    "optionC": "Upholding Islamic teachings",
    "optionD": "Preserving Malay culture",
    "correctAnswer": "B",
    "explanation": "MIB explicitly combines religion (Islam) with statecraft (Monarchy), rejecting secularism.",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Tasek Merimbun' is a heritage park centered around a:",
    "optionA": "Volcano",
    "optionB": "Lake",
    "optionC": "Waterfall",
    "optionD": "Cave system",
    "correctAnswer": "B",
    "explanation": "Tasek Merimbun is Brunei's largest natural lake and an important cultural and ecological site.",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the ceremony where the Sultan meets the public?",
    "optionA": "Majlis Istiadat",
    "optionB": "Majlis Berzikir",
    "optionC": "Majlis Ilmu",
    "optionD": "Majlis Bersalaman",
    "correctAnswer": "D",
    "explanation": "Majlis Bersalaman is a ceremony where the Sultan shakes hands and greets members of the public, especially during festivities.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which of these is a famous traditional Malay epic poem from Brunei?",
    "optionA": "Sya'ir Awang Simawn",
    "optionB": "Hikayat Hang Tuah",
    "optionC": "Ramayana",
    "optionD": "Mahabarata",
    "correctAnswer": "A",
    "explanation": "Sya'ir Awang Simawn is a classic Brunei Malay epic poem.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Brunei Darussalam Central Bank' was formerly known as:",
    "optionA": "Brunei Currency Board",
    "optionB": "Brunei Investment Agency",
    "optionC": "Monetary Authority of Brunei",
    "optionD": "Brunei Finance Ministry",
    "correctAnswer": "A",
    "explanation": "It was established as the Brunei Currency Board in 1967 and later evolved into the central bank.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "What is the primary focus of Brunei's 'Wawasan 2035' (Vision 2035)?",
    "optionA": "Military expansion",
    "optionB": "Achieving a recognized, dynamic, and sustainable economy",
    "optionC": "Becoming a tourist hub",
    "optionD": "Joining the European Union",
    "correctAnswer": "B",
    "explanation": "Wawasan Brunei 2035 aims to diversify the economy and improve the quality of life for its citizens.",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Ministry of Culture, Youth and Sports' promotes activities that:",
    "optionA": "Explore oil reserves",
    "optionB": "Preserve national heritage and develop youth",
    "optionC": "Manage foreign affairs",
    "optionD": "Oversee religious schools",
    "correctAnswer": "B",
    "explanation": "This ministry is tasked with preserving cultural heritage, organizing youth programs, and promoting sports.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these is a traditional game involving poetry and quick thinking?",
    "optionA": "Sepak Takraw",
    "optionB": "Silat",
    "optionC": "Bersyair",
    "optionD": "Gasing",
    "correctAnswer": "C",
    "explanation": "Bersyair is a form of poetic debate or recitation, a traditional intellectual game.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Sultan Omar Ali Saifuddien College' (SOASC) is a famous:",
    "optionA": "Primary school",
    "optionB": "Secondary school",
    "optionC": "University",
    "optionD": "Mosque",
    "correctAnswer": "B",
    "explanation": "SOASC is one of the oldest and most prestigious secondary schools in Brunei.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "What is the name of the traditional Malay wedding ceremony?",
    "optionA": "Majlis Perkahwinan",
    "optionB": "Bersanding",
    "optionC": "Akad Nikah",
    "optionD": "Semua di atas",
    "correctAnswer": "D",
    "explanation": "A traditional Malay wedding involves multiple ceremonies: the Akad Nikah (solemnization) and the Bersanding (sitting-in-state).",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Brunei Museum' is located in:",
    "optionA": "Kota Batu",
    "optionB": "Jerudong",
    "optionC": "Bandar Seri Begawan city center",
    "optionD": "Tutong",
    "correctAnswer": "A",
    "explanation": "The Brunei Museum is situated in the Kota Batu archaeological area, a site of historical importance.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which principle ensures that the Sultan's authority is absolute and final?",
    "optionA": "Demokrasi",
    "optionB": "Kedaulatan",
    "optionC": "Kesetiaan",
    "optionD": "Ketaatan",
    "correctAnswer": "B",
    "explanation": "Kedaulatan (Sovereignty) refers to the absolute and supreme authority of the Sultan.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "HARD"
  },
  {
    "question": "What is the main purpose of the 'Majlis Ilmu' (Knowledge Convention)?",
    "optionA": "Military training",
    "optionB": "To showcase traditional food",
    "optionC": "To disseminate religious and general knowledge",
    "optionD": "To crown the Sultan",
    "correctAnswer": "C",
    "explanation": "Majlis Ilmu is an event where scholars and experts present on various topics, emphasizing the importance of knowledge in Islam.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Royal Brunei Polo Club' is associated with which royal hobby?",
    "optionA": "Horse riding",
    "optionB": "Car racing",
    "optionC": "Falconry",
    "optionD": "Archery",
    "correctAnswer": "A",
    "explanation": "Polo, a sport played on horseback, is a well-known passion of the Sultan and the royal family.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "EASY"
  },
  {
    "question": "Which of these is a key Islamic value promoted in Bruneian society?",
    "optionA": "Individualism",
    "optionB": "Modesty and humility",
    "optionC": "Materialism",
    "optionD": "Secularism",
    "correctAnswer": "B",
    "explanation": "Islamic values such as modesty (tawaduk), humility, and community spirit are strongly promoted.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Brunei Times' was a prominent:",
    "optionA": "Radio station",
    "optionB": "Newspaper",
    "optionC": "Television channel",
    "optionD": "News website",
    "correctAnswer": "B",
    "explanation": "The Brunei Times was an English-language newspaper that ceased publication in 2016.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "What is the traditional role of the 'Wazir' in the Bruneian monarchy?",
    "optionA": "Royal chef",
    "optionB": "Military general",
    "optionC": "Chief minister or advisor",
    "optionD": "Religious leader",
    "correctAnswer": "C",
    "explanation": "The Wazirs are high-ranking nobles who historically served as the Sultan's chief ministers and advisors.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "HARD"
  },
  {
    "question": "The 'Tamu' is a traditional:",
    "optionA": "Market",
    "optionB": "Dance",
    "optionC": "House",
    "optionD": "Boat",
    "correctAnswer": "A",
    "explanation": "A Tamu is an open-air market where local farmers and vendors sell produce, handicrafts, and food.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "Which Sultan reigned during the peak of Brunei's territorial expansion?",
    "optionA": "Sultan Sharif Ali",
    "optionB": "Sultan Bolkiah",
    "optionC": "Sultan Hassan",
    "optionD": "Sultan Abdul Hakkul Mubin",
    "correctAnswer": "B",
    "explanation": "Sultan Bolkiah's reign in the 15th-16th century is considered the apex of the Bruneian Empire.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the name of the Islamic pilgrimage to Mecca that every able Muslim must undertake?",
    "optionA": "Umrah",
    "optionB": "Zakat",
    "optionC": "Haj",
    "optionD": "Solat",
    "correctAnswer": "C",
    "explanation": "The Haj is one of the Five Pillars of Islam, a mandatory pilgrimage.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Brunei Investment Agency' (BIA) manages the country's:",
    "optionA": "Oil reserves",
    "optionB": "Foreign reserves and sovereign wealth fund",
    "optionC": "Tourism campaigns",
    "optionD": "Military assets",
    "correctAnswer": "B",
    "explanation": "The BIA is responsible for investing the nation's surplus oil and gas revenues abroad.",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which of these is a traditional form of Malay poetry?",
    "optionA": "Pantun",
    "optionB": "Sonnet",
    "optionC": "Haiku",
    "optionD": "Limerick",
    "correctAnswer": "A",
    "explanation": "Pantun is a rhyming poetic form often used to express ideas, advice, or humour in a creative way.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Agreement of 1905/1906' is significant because it:",
    "optionA": "Granted independence",
    "optionB": "Introduced the British Resident system",
    "optionC": "Discovered oil",
    "optionD": "Abolished the monarchy",
    "correctAnswer": "B",
    "explanation": "This agreement led to the appointment of a British Resident, who advised the Sultan on all matters except Malay customs and religion.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "What is the traditional headscarf worn by Malay women called?",
    "optionA": "Songkok",
    "optionB": "Tudung",
    "optionC": "Serban",
    "optionD": "Kopiah",
    "correctAnswer": "B",
    "explanation": "The Tudung is a headscarf worn by Muslim women in accordance with Islamic modesty.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Ministry of Defence' is headed by:",
    "optionA": "The Crown Prince",
    "optionB": "The British High Commissioner",
    "optionC": "The Sultan himself",
    "optionD": "A appointed General",
    "correctAnswer": "C",
    "explanation": "The Sultan holds the position of Minister of Defence and Supreme Commander of the Armed Forces.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "Which value is central to the 'Malay' component of MIB?",
    "optionA": "Preserving the Malay language, culture, and customs",
    "optionB": "Adopting Western culture",
    "optionC": "Promoting individualism",
    "optionD": "Rejecting traditional attire",
    "correctAnswer": "A",
    "explanation": "The Malay component emphasizes the preservation and pride in Malay language, culture, and traditions as the national identity.",
    "subject": "MELAYU_CULTURE",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Brunei Civil War' in the 17th century was primarily a conflict over:",
    "optionA": "Oil rights",
    "optionB": "Succession to the throne",
    "optionC": "Religious differences",
    "optionD": "Foreign invasion",
    "correctAnswer": "B",
    "explanation": "The civil war was fought between two rival princes, Sultan Abdul Hakkul Mubin and Sultan Muhyiddin, following a succession dispute.",
    "subject": "BRUNEI_HISTORY",
    "difficulty": "HARD"
  },
  {
    "question": "What is the name of the Islamic declaration of faith?",
    "optionA": "Solat",
    "optionB": "Zakat",
    "optionC": "Syahadah",
    "optionD": "Saum",
    "correctAnswer": "C",
    "explanation": "The Syahadah is the first pillar of Islam, declaring belief in the oneness of God and the prophethood of Muhammad.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Tutong District' is known for its:",
    "optionA": "Oil fields",
    "optionB": "River and agricultural land",
    "optionC": "Financial center",
    "optionD": "International airport",
    "correctAnswer": "B",
    "explanation": "Tutong is characterized by the Tutong River and is a more rural, agricultural district.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which Sultan officially promulgated the MIB philosophy?",
    "optionA": "Sultan Omar Ali Saifuddien III",
    "optionB": "Sultan Hassanal Bolkiah",
    "optionC": "Sultan Sharif Ali",
    "optionD": "Sultan Muhammad Shah",
    "correctAnswer": "B",
    "explanation": "The current Sultan, Hassanal Bolkiah, formally declared MIB as the national philosophy in 1984.",
    "subject": "GENERAL_MIB",
    "difficulty": "MEDIUM"
  },
  {
    "question": "What is the traditional method of conveying royal orders or announcements?",
    "optionA": "Radio broadcast",
    "optionB": "Titah",
    "optionC": "Newspaper ad",
    "optionD": "Social media",
    "correctAnswer": "B",
    "explanation": "A Titah is a royal speech or proclamation delivered by the Sultan, often on important state and religious occasions.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  },
  {
    "question": "The 'Belait District' is the center of Brunei's:",
    "optionA": "Government",
    "optionB": "Oil and gas industry",
    "optionC": "Agriculture",
    "optionD": "Fishing industry",
    "correctAnswer": "B",
    "explanation": "The towns of Kuala Belait and Seria are the heart of Brunei's oil and gas production.",
    "subject": "GENERAL_MIB",
    "difficulty": "EASY"
  },
  {
    "question": "Which Islamic month is dedicated to fasting?",
    "optionA": "Syawal",
    "optionB": "Zulhijjah",
    "optionC": "Ramadhan",
    "optionD": "Muharram",
    "correctAnswer": "C",
    "explanation": "Ramadhan is the holy month during which Muslims fast from dawn until sunset.",
    "subject": "ISLAMIC_VALUES",
    "difficulty": "EASY"
  },
  {
    "question": "The 'Legislative Council' (LegCo) primarily functions to:",
    "optionA": "Elect the Sultan",
    "optionB": "Approve laws and the national budget",
    "optionC": "Lead the military",
    "optionD": "Manage religious affairs",
    "correctAnswer": "B",
    "explanation": "The LegCo debates and approves legislation and the government's budget proposed by the Sultan.",
    "subject": "BERAJA_SYSTEM",
    "difficulty": "MEDIUM"
  }
];


async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user (upsert to handle existing data)
  const adminPassword = await bcrypt.hash('admin123', 10);
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
  const studentPassword = await bcrypt.hash('student123', 10);
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
  const vendorPassword = await bcrypt.hash('vendor123', 10);
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
          subject: question.subject as any,
          difficulty: question.difficulty as any
        }
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`Question already exists: ${question.question.substring(0, 50)}...`);
      } else {
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
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`Reward already exists: ${reward.title}`);
      } else {
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
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`Pet already exists: ${pet.name}`);
      } else {
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
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('Boss already exists: Guardian of Knowledge');
    } else {
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