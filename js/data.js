/* ── CATEGORY COLORS ── */
var CATEGORY_COLORS = {
  "Robotic": "#00e5ff",
  "AI4EDU": "#ff6b6b",
  "Award": "#ffb300",
  "Project": "#ff4da6"
};

/* ── MAKERSPACE EXHIBITS ── */
var EXHIBITS = {
  "MS-R-001":{
    id:"MS-R-001",
    category:"Robotic",
    name:"CADT01 & CADT02",
    audio:"audio/MS-R-001.mp3",
    image:["images/exhibits/MS-R-001.jpg","images/exhibits/MS-R-002.jpg"],
    youtubeVideo:"https://youtu.be/-HGtoXCyy30",
    descEng:"The first robot is a rice transplanting robot, which has the function of pulling out seedlings, collecting balls, which are considered rice grains, and then shooting the balls into a designated location. The second robot is a harvesting robot, which has the function of catching the balls from the first robot and automatically placing them in a designated location, which is an important function for the Robocon 2024 competition. The robot was built by students from the Department of Computer Science in collaboration with the Department of Telecommunications and Networks, who are all passionate about robots and engineering.",
    descKhm:" រ៉ូបូតទី១គឺជារ៉ូបូតស្ទូងស្រូវដែលរ៉ូបូតនេះមានមុខងារក្នុងការដកសំណាបមកដាំរួចប្រមូលបាល់ដែលគេចាត់ទុកថាជាគ្រាប់ស្រូវបន្ទាប់មកបាញ់បាល់ចូលទៅក្នុងទីតាំងកំណត់។ រ៉ូបូតទី២គឺជារ៉ូបូតប្រមូលផល់ដែលរ៉ូបូតមានមុខងារចាប់បាល់ដែលបានមកពីរ៉ូបូតទី១ដាក់ចូលទីតាំងដែលកំណត់ដោយស្វ័យប្រវត្តិដែលនេះជាមុខងារសំខាន់សម្រាប់ការប្រកួតរ៉ូបូខនឆ្នាំ២០២៤។ រ៉ូបូតនេះត្រូវបានសាងសង់ឡើងដោយនិស្សិតមកពីឌីផាតមិនវិទ្យាសាស្ត្រកុំព្យូទ័រសហការជាមួយនាយកដ្ឋានទូរគមនាគមន៍និងបណ្តាញដែលសុទ្ធតែមានចំណង់ចំណូលចិត្តលើរ៉ូបូតនិងវិស្វកម្ម។ ",
    emoji:"🤖",
    tags:["#ROBOCON","#ROBOT","#ENGINEERING"]
  },
  "MS-AE-001":{
    id:"MS-AE-001",
    category:"AI4EDU",
    name:"Smart Security ATM System",
    audio:"audio/MS-AE-001.mp3",
    image:"images/exhibits/MS-AE-001.jpg",
    youtubeVideo:"",
    descEng:"Traditional ATM security is reactive, only responding after a crime has occurred. Our solution addresses this by integrating IoT and AI to create a proactive, real-time defense. A YOLOv8 model continuously analyzes live webcam footage, detecting threats such as masked or helmeted individuals and weapons with 90% confidence or higher. Once a threat is confirmed, the system instantly sends a signal via HTTP POST to an ESP32 web server, which activates a relay to lock the ATM area automatically, shifting security from passive surveillance to an active, automated barrier that responds the moment a threat is identified.",
    descKhm:"សុវត្ថិភាពម៉ាស៊ីន ATM បែបប្រពៃណីគឺមានលក្ខណៈប្រតិកម្មតបវិញ ដោយឆ្លើយតបតែបន្ទាប់ពីមានឧក្រិដ្ឋកម្មកើតឡើង។ ដំណោះស្រាយរបស់យើងដោះស្រាយបញ្ហានេះដោយការរួមបញ្ចូល IoT និង AI ដើម្បីបង្កើតការការពារប្រកបដោយភាពសកម្ម និងទាន់ពេលវេលា។ ម៉ូដែល YOLOv8 វិភាគវីដេអូផ្សាយផ្ទាល់តាមកាមេរ៉ាបណ្ដាញជាបន្តបន្ទាប់ ដោយរកឃើញការគំរាមកំហែងដូចជាបុគ្គលដែលពាក់ម៉ាស់ ឬមួកសុវត្ថិភាព និងអាវុធជាមួយនឹងទំនុកចិត្ត 90% ឬខ្ពស់ជាងនេះ។ នៅពេលដែលការគំរាមកំហែងត្រូវបានបញ្ជាក់ ប្រព័ន្ធនឹងផ្ញើសញ្ញាភ្លាមៗតាមរយៈ HTTP POST ទៅកាន់ម៉ាស៊ីនបម្រើគេហទំព័រ ESP32 ដែលធ្វើឱ្យការបញ្ជូនបន្តសកម្មដើម្បីចាក់សោតំបន់ ATM ដោយស្វ័យប្រវត្តិ ដោយផ្លាស់ប្តូរសុវត្ថិភាពពីការឃ្លាំមើលអកម្មទៅជារបាំងស្វ័យប្រវត្តិសកម្មដែលឆ្លើយតបនៅពេលដែលការគំរាមកំហែងត្រូវបានកំណត់។",
    emoji:"🔒",
    tags:["#AI","#SECURITY","#IOT","#YOLO"]
  },
  "MS-AE-002":{
    id:"MS-AE-002",
    category:"AI4EDU",
    name:"Pet Talk",
    audio:"audio/MS-AE-002.mp3",
    image:"images/exhibits/MS-AE-002.jpg",
    youtubeVideo:"",
    descEng:"Most dog owners struggle to recognize early signs of illness or stress, and studies show that 65.5% misunderstand their dog's behavior, leading to delayed care and preventable suffering. PetTalk is a low-cost, AI-powered multisensory collar that bridges this gap by detecting a dog's emotional state in real time. It combines an audio AI model, trained to classify barks, whines, and growls into emotions like happy, stressed, or calm, with a heart rate monitor to give owners accurate, real-time insights into their pet's well-being.",
    descKhm:"ម្ចាស់ឆ្កែភាគច្រើនពិបាកសម្គាល់សញ្ញាដំបូងនៃជំងឺ ឬភាពតានតឹង ហើយការសិក្សាបង្ហាញថា 65.5% យល់ច្រឡំអំពីអាកប្បកិរិយារបស់ឆ្កែរបស់ពួកគេ ដែលនាំឱ្យមានការថែទាំយឺតយ៉ាវ និងទុក្ខវេទនាដែលអាចការពារបាន។ PetTalk គឺជាក្រឡៅកចាប់សញ្ញាដែលមានតម្លៃទាប ដែលដំណើរការដោយ AI ដែលបំពេញចន្លោះប្រហោងនេះដោយរកឃើញស្ថានភាពអារម្មណ៍របស់ឆ្កែក្នុងពេលវេលាជាក់ស្តែង។ វារួមបញ្ចូលគ្នានូវគំរូ AI អូឌីយ៉ូ  ដែលត្រូវបានបណ្តុះបណ្តាលដើម្បីចាត់ថ្នាក់សំឡេងព្រុស សំឡេងថ្ងូរ និងសំឡេងគ្រហឹមទៅជាអារម្មណ៍ដូចជា រីករាយ តានតឹង ឬស្ងប់ស្ងាត់ ជាមួយនឹងម៉ូនីទ័រអត្រាចង្វាក់បេះដូង ដើម្បីផ្តល់ឱ្យម្ចាស់នូវការយល់ដឹងត្រឹមត្រូវ និងពេលវេលាជាក់ស្តែងអំពីសុខុមាលភាពសត្វចិញ្ចឹមរបស់ពួកគេ។",
    emoji:"🐕",
    tags:["#AI","#PETCARE","#HEALTH","#ML"]
  },
  "MS-AE-003":{
    id:"MS-AE-003",
    image:"images/exhibits/MS-AE-003.jpg",
    youtubeVideo:"",
    category:"AI4EDU",
    name:"Drowning and Accident Prevention",
    audio:"audio/MS-AE-003.mp3",
    descEng:"Drowning is a major cause of accidental death, especially among children, and can become fatal in under 30 seconds. Human supervision is often unreliable due to distractions, fatigue, and crowded environments. Our AI system continuously monitors cameras and sensors to detect abnormal behavior such as immobility, prolonged submersion, or struggle. When danger is detected, it triggers instant alerts and activates emergency responses, helping improve rescue speed and reduce drowning incidents.",
    descKhm:"ការលង់ទឹកគឺជាមូលហេតុសំខាន់មួយនៃការស្លាប់ដោយចៃដន្យ ជាពិសេសក្នុងចំណោមកុមារ និងអាចកើតឡើងក្នុងរយៈពេលតិចជាង 30 វិនាទី។ ការត្រួតពិនិត្យរបស់មនុស្សមិនអាចទុកចិត្តបានដោយសារការរំខាន និងភាពអស់កម្លាំង។ ប្រព័ន្ធ AI របស់យើងតាមដានកាមេរ៉ា និងឧបករណ៍ចាប់សញ្ញាជាបន្តបន្ទាប់ ដើម្បីរកឃើញឥរិយាបថមិនធម្មតា។ ពេលមានគ្រោះថ្នាក់ វានឹងបញ្ចូនការជូនដំណឹងភ្លាមៗ និងជួយបង្កើនល្បឿនសង្គ្រោះ។",
    emoji:"🏊",
    tags:["#AI","#SAFETY","#EMERGENCY","#LIFE-SAVING"]
  },
  "MS-AW-001":{
    id:"MS-AW-001",
    image:"images/exhibits/MS-AW-001.jpg",
    youtubeVideo:"",
    category:"Award",
    name:"River Monitoring Award",
    audio:"audio/MS-AW-001.mp3",
    descEng:"CADT received the Water Monitoring Award at a water quality and monitoring competition held in Vientiane, Laos in 2023. The competition tested teams' technical capabilities across three environmental monitoring challenges: Water Level, Soil Moisture, and Water Quality.",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់ Water Monitoring ក្នុងការប្រកួតត្រួតពិនិត្យគុណភាពទឹក ដែលប្រព្រឹត្តទៅនៅ វៀងចន្ទន៍ ប្រទេសឡាវ ឆ្នាំ ២០២៣ ។ ការប្រកួតនេះតម្រូវឱ្យក្រុមមានសមត្ថភាពបច្ចេកទេសខ្ពស់ក្នុងការស្ទង់ស្ទង់ Water Level, Soil Moisture និង Water Quality ។",
    emoji:"💧",
    tags:["#AWARD","#ENVIRONMENTAL","#MONITORING","#2023"]
  },
  "MS-AW-002":{
    id:"MS-AW-002",
    image:"images/exhibits/MS-AW-002.jpg",
    youtubeVideo:"",
    category:"Award",
    name:"Robocon 2021 Design Award",
    audio:"audio/MS-AW-002.mp3",
    descEng:"CADT earned the Best Design Award at the 8th National Robocon Cambodia (2021), held at the Royal University of Phnom Penh (RUPP). The theme, inspired by the ancient Chinese game \"Throwing Arrows into Pots\", required teams to build two robots: a throwing robot and a defensive robot. This award recognized CADT's outstanding creative engineering and robot aesthetics.",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់រចនា (Best Design Award) ក្នុងការប្រកួត Robocon Cambodia លើកទី ៨ ឆ្នាំ ២០២១ ដែលប្រព្រឹត្តទៅនៅ សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP) ។ វិញ្ញាសាឆ្នាំនេះ \"Throwing Arrows into Pots\" ជាល្បែងបុរាណចិន ដែលតម្រូវឱ្យបង្កើតរ៉ូបូតចំនួន ២  រ៉ូបូតបាញ់ និងរ៉ូបូតការពារ ។ ពានរចនានេះបង្ហាញពីការរចនាបច្ចេកទេសដ៏ច្នៃប្រឌិតរបស់ក្រុម CADT ។",
    emoji:"🎨",
    tags:["#AWARD","#ROBOCON","#DESIGN","#2021"]
  },
  "MS-AW-003":{
    id:"MS-AW-003",
    image:"images/exhibits/MS-AW-003.jpg",
    youtubeVideo:"",
    category:"Award",
    name:"Robocon 2023 Design Award",
    audio:"audio/MS-AW-003.mp3",
    descEng:"CADT earned the Best Design Award for the second time at the 10th National Robocon Cambodia (2023), hosted at the iconic Morodok Techo National Stadium. This edition was especially significant as Cambodia also served as the host nation for ABU Robocon 2023, an international event with 14 university teams from 13 countries, themed around Cambodian culture: \"Casting Flowers over Angkor Wat.\”",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់រចនា (Best Design Award) ម្តងទៀត នៅការប្រកួត Robocon Cambodia លើកទី ១០ ឆ្នាំ ២០២៣ ។ ឆ្នាំនេះពិសេសណាស់ ព្រោះប្រទេសកម្ពុជាក៏ជាម្ចាស់ផ្ទះ ABU Robocon 2023 ផងដែរ ដែលប្រព្រឹត្តទៅនៅ កីឡដ្ឋានជាតិ មរតកតេជោ ខ្នាតអន្តរជាតិ ដោយមានចំនួន ១៤ ក្រុម ពី ១៣ ប្រទេស ។",
    emoji:"🎨",
    tags:["#AWARD","#ROBOCON","#DESIGN","#2023"]
  },
  "MS-AW-004":{
    id:"MS-AW-004",
    category:"Award",
    name:"Robocon 2022 National Championship",
    image:"images/exhibits/MS-AW-004.jpg",
    audio:"audio/MS-AW-004.mp3",
    youtubeVideo:"",
    descEng:"The CADT01 team won the national championship at the 9th Robocon Cambodia on June 26, 2022. The theme \"Lagori\", a traditional South Indian game involving a ball and a pile of flat stones, required robots to compete as seekers (rebuilding the stack) versus hitters (trying to knock it over). This victory earned CADT the right to represent Cambodia at ABU Robocon 2022 in New Delhi, India.",
    descKhm:"ក្រុម CADT01 បានឈ្នះជ័យជំនះកម្រិតជាតិ នៅការប្រកួត Robocon Cambodia លើកទី ៩ ឆ្នាំ ២០២២ ។ វិញ្ញាសា \"Lagori\" ជាល្បែងប្រពៃណីឥណ្ឌាខាងត្បូង ដែលតម្រូវឱ្យក្រុមមួយព្យាយាមកម្ទេចជង់ថ្ម ហើយក្រុមមួយទៀតស្ទាក់ (Seeker vs Hitter) ។ ការឈ្នះនេះធ្វើឱ្យ CADT បានតំណាងកម្ពុជាក្នុងការប្រកួត ABU Robocon 2022 ។",
    emoji:"🏆",
    tags:["#AWARD","#ROBOCON","#CHAMPION","#2022"]
  },
  "MS-AW-005":{
    id:"MS-AW-005",
    category:"Award",
    name:"TOYOTA Special Award - ABU Robocon 2022",
    audio:"audio/MS-AW-005.mp3",
    image:"images/exhibits/MS-AW-005.jpg",
    youtubeVideo:"",
    descEng:"CADT made history as the first Cambodian team to reach the Semi-Final stage at ABU Robocon 2022 (top 6 teams internationally), defeating Malaysia 65–45 and Fiji 65–25. Toyota Motor Corporation recognized this achievement by presenting the Special Toyota Award, acknowledging outstanding mechanical engineering, robot design, and competitive performance on the international stage.",
    descKhm:"ក្រុម CADT បានបំបែកកំណត់ត្រា ដោយឈានដល់ Semi-Final (ក្រុម ៦ ចុងក្រោយ) ក្នុងការប្រកួត ABU Robocon 2022 ជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្ររបស់ប្រទេសកម្ពុជា, ដោយទោទម្លាក់ Malaysia (65-45) និង Fiji (65-25) ។ ការបដិភាគអ្វីបែបនេះ ធ្វើឱ្យ Toyota Motor Corporation ផ្តល់ \"Special Toyota Award\" ដែលជាការទទួលស្គាល់ពិសេសសម្រាប់ភាពច្នៃប្រឌិតបច្ចេកទេស និងការរចនារ៉ូបូតកម្រិតខ្ពស់ ។",
    emoji:"🏆",
    tags:["#AWARD","#TOYOTA","#INTERNATIONAL","#2022"]
  },
  "MS-AW-006":{
    id:"MS-AW-006",
    category:"Award",
    name:"Robocon 2024 Design Award",
    audio:"audio/MS-AW-006.mp3",
    image:"images/exhibits/MS-AW-006.jpg",
    youtubeVideo:"",
    descEng:"CADT received the Design Award at the 2024 national Robocon Cambodia competition. The international ABU Robocon 2024 theme was \"Harvest Day\", held in Ha Long City, Vietnam, where robots were required to simulate an entire rice cultivation cycle: planting seedlings, harvesting grain, and transporting rice into storage silos, all within a time limit.",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់រចនានៅការប្រកួត Robocon Cambodia ឆ្នាំ ២០២៤ ។ វិញ្ញាសា \"Harvest Day\" ដែល ABU Robocon ២០២៤ ប្រព្រឹត្តទៅនៅ ហ្វាឡុង ប្រទេសវៀតណាម ត្រូវការក្រុមបង្កើតរ៉ូបូតទំនើបដែលអាចតាំង ច្រូតកាត់ និងដឹកស្រូវ ក្នុងរយៈពេលកំណត់ ។",
    emoji:"🎨",
    tags:["#AWARD","#ROBOCON","#DESIGN","#2024"]
  },
  "MS-AW-007":{
    id:"MS-AW-007",
    category:"Award",
    name:"Football Cup Champions",
    audio:"audio/MS-AW-007.mp3",
    image:"images/exhibits/MS-AW-007.jpg",
    youtubeVideo:"",
    descEng:"The CADT Warriors football team claimed first place in the Football Cup championship for two consecutive years. This back-to-back title demonstrates the team's consistent strength, teamwork, and competitive spirit beyond the field of robotics, reflecting CADT's well-rounded culture of excellence in both technology and sports.",
    descKhm:"ក្រុម CADT Warriors បានឈ្នះចំណាត់ថ្នាក់ទីមួយ ក្នុងការប្រកួតបាល់ទាត់ (Football Cup) ២ ឆ្នាំ។ ជោគជ័យ ២ ដង នេះ បង្ហាញពីភាពខ្លាំងក្លា ស្មារតីក្រុម និងភាពខ្ជាប់ខ្ជួនក្នុងការប្រកួតប្រជែងផ្នែកកីឡា ។",
    emoji:"⚽",
    tags:["#AWARD","#SPORTS","#CHAMPIONS"]
  },
  "MS-PR-001":{
    id:"MS-PR-001",
    category:"Project",
    name:"Education for Hope (EiE)",
    audio:"audio/MS-PR-001.mp3",
    image:"images/exhibits/MS-PR-001.jpg",
    youtubeVideo:"",
    descEng:"EiE, Education for Hope is a CADT IDRI Makerspace initiative providing quality emergency education to disaster-affected children in Siem Reap, Cambodia. The project applies the CARE Framework, prioritizing emotional safety and wellbeing before academic content, aligned with UNICEF and INEE EiE principles.",
    descKhm:"គម្រោង EiE, Education for Hope គឺជាគំនិតផ្តួចផ្តើមរបស់ CADT IDRI Makerspace ដែលមានគោលបំណងផ្តល់ការអប់រំបន្ទាន់ដ៏មានគុណភាព ដល់ក្មេងៗដែលរងផលប៉ះពាល់ពីគ្រោះមហន្តរាយ នៅ សៀមរាប ប្រទេសកម្ពុជា ។ គម្រោងនេះប្រើ CARE Framework ដើម្បីដាក់ការថែទាំ (Care) ជាអាទិភាពមុន ហើយបន្ទាប់មក ការរៀន ។",
    emoji:"🎓",
    tags:["#PROJECT","#EDUCATION","#COMMUNITY","#CARE"]
  },
  "MS-PR-002":{
    id:"MS-PR-002",
    category:"Project",
    name:"Khmer Braille Printer",
    audio:"audio/MS-PR-002.mp3",
    image:"images/exhibits/MS-PR-002.jpg",
    youtubeVideo:"",
    descEng:"The Khmer Braille Printer project is developed as an extension of the Khmer Braille Translation Machine at CADT, in collaboration with the National Institute of Special Education (NISE). It aims to make Braille printing affordable and accessible for students and visually impaired people across Cambodia.",
    descKhm:"គម្រោង Khmer Braille Printer ត្រូវបានបង្កើតឡើងជាការពង្រីកបន្ថែម (extension) ពី Khmer Braille Translation Machine របស់ CADT ក្នុងកិច្ចសហការជាមួយ វិទ្យាស្ថានជាតិអប់រំពិសេស (NISE) ។ គោលបំណងគឺផ្តល់ការចូលប្រើប្រាស់ Braille ដ៏ងាយស្រួល និងចំណាយតិច ដល់សិស្ស និងជនពិការភ្នែកនៅកម្ពុជា ។",
    emoji:"⌚",
    tags:["#PROJECT","#ACCESSIBILITY","#BRAILLE","#INCLUSIVE"]
  }
};
