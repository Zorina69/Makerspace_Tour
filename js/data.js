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
    descEng:"The first robot is a rice transplanting robot, which has the function of pulling out seedlings, collecting balls, which are considered rice grains, and then shooting the balls into a designated location. The second robot is a harvesting robot, which has the function of catching the balls from the first robot and automatically placing them in a designated location, which is an important function for the Robocon 2024 competition. The robot was built by students from the Department of Computer Science in collaboration with the Department of Telecommunications and Networks, who are all passionate about robots and engineering.",
    descKhm:"រ៉ូបូតទី១គឺជារ៉ូបូតស្ទូងស្រូវដែលរ៉ូបូតនេះមានមុខងារក្នុងការដកសំណាបមកដាំរួចប្រមូលបាល់ដែលគេចាត់ទុកថាជាគ្រាប់ស្រូវបន្ទាប់មកបាញ់បាល់ចូលទៅក្នុងទីតាំងកំណត់។ រ៉ូបូតទី២គឺជារ៉ូបូតប្រមូលផល់ដែលរ៉ូបូតមានមុខងារចាប់បាល់ដែលបានមកពីរ៉ូបូតទី១ដាក់ចូលទីតាំងដែលកំណត់ដោយស្វ័យប្រវត្តិដែលនេះជាមុខងារសំខាន់សម្រាប់ការប្រកួតរ៉ូបូខនឆ្នាំ២០២៤។ រ៉ូបូតនេះត្រូវបានសាងសង់ឡើងដោយនិស្សិតមកពីឌីផាតមិនវិទ្យាសាស្ត្រកុំព្យូទ័របង្កើនការសហការជាមួយនាយកដ្ឋានទូរគមនាគមន៍និងបណ្តាញដែលសុទ្ធតែមានចំណង់ចំណូលចិត្តលើរ៉ូបូតនិងវិស្វកម្ម។",
    emoji:"🤖",
    tags:["#ROBOCON","#ROBOT","#ENGINEERING"]
  },
  "MS-AE-001":{
    id:"MS-AE-001",
    category:"AI4EDU",
    name:"Smart Security ATM System",
    descEng:"Traditional ATM security is reactive, only responding after a crime has occurred. Our solution addresses this by integrating IoT and AI to create a proactive, real-time defense. A YOLOv8 model continuously analyzes live webcam footage, detecting threats such as masked or helmeted individuals and weapons with 90% confidence or higher. Once a threat is confirmed, the system instantly sends a signal via HTTP POST to an ESP32 web server, which activates a relay to lock the ATM area automatically — shifting security from passive surveillance to an active, automated barrier that responds the moment a threat is identified.",
    descKhm:"សុវត្ថិភាពម៉ាស៊ីន ATM បែបប្រពៃណីគឺមានលក្ខណៈប្រតិកម្មតបវិញ ដោយឆ្លើយតបតែបន្ទាប់ពីមានឧក្រិដ្ឋកម្មកើតឡើង។ ដំណោះស្រាយរបស់យើងដោះស្រាយបញ្ហានេះដោយការរួមបញ្ចូល IoT និង AI ដើម្បីបង្កើតការការពារប្រកបដោយភាពសកម្ម និងទាន់ពេលវេលា។ ម៉ូដែល YOLOv8 វិភាគវីដេអូផ្សាយផ្ទាល់តាមកាមេរ៉ាបណ្ដាញជាបន្តបន្ទាប់ ដោយរកឃើញការគំរាមកំហែងដូចជាបុគ្គលដែលពាក់ម៉ាស់ ឬមួកសុវត្ថិភាព និងអាវុធជាមួយនឹងទំនុកចិត្ត 90% ឬខ្ពស់ជាងនេះ។ នៅពេលដែលការគំរាមកំហែងត្រូវបានបញ្ជាក់ ប្រព័ន្ធនឹងផ្ញើសញ្ញាភ្លាមៗតាមរយៈ HTTP POST ទៅកាន់ម៉ាស៊ីនបម្រើគេហទំព័រ ESP32 ដែលធ្វើឱ្យការបញ្ជូនបន្តសកម្មដើម្បីចាក់សោតំបន់ ATM ដោយស្វ័យប្រវត្តិ។",
    emoji:"🔒",
    tags:["#AI","#SECURITY","#IOT","#YOLO"]
  },
  "MS-AE-002":{
    id:"MS-AE-002",
    category:"AI4EDU",
    name:"Pet Talk",
    descEng:"Most dog owners struggle to recognize early signs of illness or stress, and studies show that 65.5% misunderstand their dog's behavior, leading to delayed care and preventable suffering. PetTalk is a low-cost, AI-powered multisensory collar that bridges this gap by detecting a dog's emotional state in real time. It combines an audio AI model — trained to classify barks, whines, and growls into emotions like happy, stressed, or calm — with a heart rate monitor to give owners accurate, real-time insights into their pet's well-being.",
    descKhm:"ម្ចាស់ឆ្កែភាគច្រើនពិបាកសម្គាល់សញ្ញាដំបូងនៃជំងឺ ឬភាពតានតឹង ហើយការសិក្សាបង្ហាញថា 65.5% យល់ច្រឡំអំពីអាកប្បកិរិយារបស់ឆ្កែរបស់ពួកគេ ដែលនាំឱ្យមានការថែទាំយឺតយ៉ាវ និងទុក្ខវេទនាដែលអាចការពារបាន។ PetTalk គឺជាក្រឡៅកចាប់សញ្ញាដែលមានតម្លៃទាប ដែលដំណើរការដោយ AI ដែលបំពេញចន្លោះប្រហោងនេះដោយរកឃើញស្ថានភាពអារម្មណ៍របស់ឆ្កែក្នុងពេលវេលាជាក់ស្តែង។",
    emoji:"🐕",
    tags:["#AI","#PETCARE","#HEALTH","#ML"]
  },
  "MS-AE-003":{
    id:"MS-AE-003",
    category:"AI4EDU",
    name:"Drowning and Accident Prevention",
    descEng:"Drowning remains one of the leading causes of accidental death, particularly among children, with accidents capable of turning fatal in under 30 seconds. Human supervision alone is unreliable due to distractions, fatigue, and crowded environments, leaving many pools without effective real-time monitoring. Our AI-powered system addresses this by continuously monitoring cameras and sensors to detect unusual behaviors such as immobility, prolonged submersion, or signs of struggle. When a threat is identified, the system instantly triggers an alert and activates automated emergency responses — such as rescue devices or notifying emergency personnel — significantly increasing the chance of a timely rescue and reducing drowning incidents.",
    descKhm:"ការលង់ទឹកនៅតែជាមូលហេតុចម្បងមួយនៃការស្លាប់ដោយចៃដន្យ ជាពិសេសក្នុងចំណោមកុមារ ដែលគ្រោះថ្នាក់អាចបណ្តាលឱ្យស្លាប់ក្នុងរយៈពេលតិចជាង 30 វិនាទី។ ការត្រួតពិនិត្យរបស់មនុស្សតែម្នាក់ឯងគឺមិនអាចទុកចិត្តបានដោយសារតែការរំខាន ភាពអស់កម្លាំង និងបរិស្ថានមានមនុស្សច្រើនកុះករ។ ប្រព័ន្ធដែលដំណើរការដោយបញ្ញាសិប្បនិម្មិតរបស់យើងដោះស្រាយបញ្ហានេះដោយតាមដានកាមេរ៉ា និងឧបករណ៍ចាប់សញ្ញាជាបន្តបន្ទាប់។",
    emoji:"🏊",
    tags:["#AI","#SAFETY","#EMERGENCY","#LIFE-SAVING"]
  },
  "MS-AW-001":{
    id:"MS-AW-001",
    category:"Award",
    name:"River Monitoring Award",
    descEng:"CADT received the Water Monitoring Award at a water quality and monitoring competition held in Vientiane, Laos in 2023. The competition tested teams' technical capabilities across three environmental monitoring challenges: Water Level, Soil Moisture, and Water Quality.",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់ Water Monitoring ក្នុងការប្រកួតត្រួតពិនិត្យគុណភាពទឹក ដែលប្រព្រឹត្តទៅនៅ វៀងចន្ទន៍ ប្រទេសឡាវ ឆ្នាំ ២០២៣ ។ ការប្រកួតនេះតម្រូវឱ្យក្រុមមានសមត្ថភាពបច្ចេកទេសខ្ពស់ក្នុងការស្ទង់ស្ទង់ Water Level, Soil Moisture និង Water Quality ។",
    emoji:"💧",
    tags:["#AWARD","#ENVIRONMENTAL","#MONITORING","#2023"]
  },
  "MS-AW-002":{
    id:"MS-AW-002",
    category:"Award",
    name:"Robocon 2021 Design Award",
    descEng:"CADT earned the Best Design Award at the 8th National Robocon Cambodia (2021), held at the Royal University of Phnom Penh (RUPP). The theme — inspired by the ancient Chinese game \"Throwing Arrows into Pots\" — required teams to build two robots: a throwing robot and a defensive robot. This award recognized CADT's outstanding creative engineering and robot aesthetics.",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់រចនា (Best Design Award) ក្នុងការប្រកួត Robocon Cambodia លើកទី ៨ ឆ្នាំ ២០២១ ដែលប្រព្រឹត្តទៅនៅ សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP) ។",
    emoji:"🎨",
    tags:["#AWARD","#ROBOCON","#DESIGN","#2021"]
  },
  "MS-AW-003":{
    id:"MS-AW-003",
    category:"Award",
    name:"Robocon 2023 Design Award",
    descEng:"CADT earned the Best Design Award for the second time at the 10th National Robocon Cambodia (2023), hosted at the iconic Morodok Techo National Stadium. This edition was especially significant as Cambodia also served as the host nation for ABU Robocon 2023 — an international event with 14 university teams from 13 countries, themed around Cambodian culture: \"Casting Flowers over Angkor Wat.\"",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់រចនា (Best Design Award) ម្តងទៀត នៅការប្រកួត Robocon Cambodia លើកទី ១០ ឆ្នាំ ២០២៣ ។ ឆ្នាំនេះពិសេសណាស់ ព្រោះប្រទេសកម្ពុជាក៏ជាម្ចាស់ផ្ទះ ABU Robocon 2023 ផងដែរ។",
    emoji:"🎨",
    tags:["#AWARD","#ROBOCON","#DESIGN","#2023"]
  },
  "MS-AW-004":{
    id:"MS-AW-004",
    category:"Award",
    name:"Robocon 2022 National Championship",
    descEng:"The CADT01 team won the national championship at the 9th Robocon Cambodia on June 26, 2022. The theme \"Lagori\" — a traditional South Indian game involving a ball and a pile of flat stones — required robots to compete as seekers (rebuilding the stack) versus hitters (trying to knock it over). This victory earned CADT the right to represent Cambodia at ABU Robocon 2022 in New Delhi, India.",
    descKhm:"ក្រុម CADT01 បានឈ្នះជ័យជំនះកម្រិតជាតិ នៅការប្រកួត Robocon Cambodia លើកទី ៩ ឆ្នាំ ២០២២ ។ វិញ្ញាសា \"Lagori\" ជាល្បែងប្រពៃណីឥណ្ឌាខាងត្បូង ដែលតម្រូវឱ្យក្រុមមួយព្យាយាមកម្ទេចជង់ថ្ម ហើយក្រុមមួយទៀតស្ទាក់។",
    emoji:"🏆",
    tags:["#AWARD","#ROBOCON","#CHAMPION","#2022"]
  },
  "MS-AW-005":{
    id:"MS-AW-005",
    category:"Award",
    name:"TOYOTA Special Award - ABU Robocon 2022",
    descEng:"CADT made history as the first Cambodian team to reach the Semi-Final stage at ABU Robocon 2022 (top 6 teams internationally), defeating Malaysia 65–45 and Fiji 65–25. Toyota Motor Corporation recognized this achievement by presenting the Special Toyota Award — acknowledging outstanding mechanical engineering, robot design, and competitive performance on the international stage.",
    descKhm:"ក្រុម CADT បានបំបែកកំណត់ត្រា ដោយឈានដល់ Semi-Final (ក្រុម ៦ ចុងក្រោយ) ក្នុងការប្រកួត ABU Robocon 2022 ជាលើកដំបូងក្នុងប្រវត្តិសាស្ត្ររបស់ប្រទេសកម្ពុជា — ដោយទោទម្លាក់ Malaysia (65-45) និង Fiji (65-25) ។",
    emoji:"🏆",
    tags:["#AWARD","#TOYOTA","#INTERNATIONAL","#2022"]
  },
  "MS-AW-006":{
    id:"MS-AW-006",
    category:"Award",
    name:"Robocon 2024 Design Award",
    descEng:"CADT received the Design Award at the 2024 national Robocon Cambodia competition. The international ABU Robocon 2024 theme was \"Harvest Day\" — held in Ha Long City, Vietnam — where robots were required to simulate an entire rice cultivation cycle: planting seedlings, harvesting grain, and transporting rice into storage silos, all within a time limit.",
    descKhm:"ក្រុម CADT បានទទួលពានរង្វាន់រចនានៅការប្រកួត Robocon Cambodia ឆ្នាំ ២០២៤ ។ វិញ្ញាសា \"Harvest Day\" ដែល ABU Robocon ២០២៤ ប្រព្រឹត្តទៅនៅ ហ្វាឡុង ប្រទេសវៀតណាម។",
    emoji:"🎨",
    tags:["#AWARD","#ROBOCON","#DESIGN","#2024"]
  },
  "MS-AW-007":{
    id:"MS-AW-007",
    category:"Award",
    name:"Football Cup Champions",
    descEng:"The CADT Warriors football team claimed first place in the Football Cup championship for two consecutive years. This back-to-back title demonstrates the team's consistent strength, teamwork, and competitive spirit beyond the field of robotics — reflecting CADT's well-rounded culture of excellence in both technology and sports.",
    descKhm:"ក្រុម CADT Warriors បានឈ្នះចំណាត់ថ្នាក់ទីមួយ ក្នុងការប្រកួតបាល់ទាត់ (Football Cup) ២ ឆ្នាំ ។ ជោគជ័យ ២ ដង នេះ បង្ហាញពីភាពខ្លាំងក្លា ស្មារតីក្រុម និងភាពខ្ជាប់ខ្ជួនក្នុងការប្រកួតប្រជែង។",
    emoji:"⚽",
    tags:["#AWARD","#SPORTS","#CHAMPIONS"]
  },
  "MS-PR-001":{
    id:"MS-PR-001",
    category:"Project",
    name:"Education for Hope (EiE)",
    descEng:"EiE — Education for Hope is a CADT IDRI Makerspace initiative providing quality emergency education to disaster-affected children in Siem Reap, Cambodia. The project applies the CARE Framework — prioritizing emotional safety and wellbeing before academic content, aligned with UNICEF and INEE EiE principles.",
    descKhm:"គម្រោង EiE — Education for Hope គឺជាគំនិតផ្តួចផ្តើមរបស់ CADT IDRI Makerspace ដែលមានគោលបំណងផ្តល់ការអប់រំបន្ទាន់ដ៏មានគុណភាព ដល់ក្មេងៗដែលរងផលប៉ះពាល់ពីគ្រោះមហន្តរាយ នៅ សៀមរាប ប្រទេសកម្ពុជា ។",
    emoji:"🎓",
    tags:["#PROJECT","#EDUCATION","#COMMUNITY","#CARE"]
  },
  "MS-PR-002":{
    id:"MS-PR-002",
    category:"Project",
    name:"Khmer Braille Printer",
    descEng:"The Khmer Braille Printer project is developed as an extension of the Khmer Braille Translation Machine at CADT, in collaboration with the National Institute of Special Education (NISE). It aims to make Braille printing affordable and accessible for students and visually impaired people across Cambodia.",
    descKhm:"គម្រោង Khmer Braille Printer ត្រូវបានបង្កើតឡើងជាការពង្រីកបន្ថែម (extension) ពី Khmer Braille Translation Machine របស់ CADT ក្នុងកិច្ចសហការជាមួយ វិទ្យាស្ថានជាតិអប់រំពិសេស (NISE) ។",
    emoji:"⌚",
    tags:["#PROJECT","#ACCESSIBILITY","#BRAILLE","#INCLUSIVE"]
  }
};
