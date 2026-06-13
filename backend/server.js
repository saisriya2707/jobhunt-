const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'jobhunt_secret_2024';

app.use(cors());
app.use(express.json());

// ─── Mock Users ──────────────────────────────────────────────────────────────
const USERS = [
  { id: 1, username: 'rahul', password: 'rahul@2021', name: 'Rahul Attuluri' },
  { id: 2, username: 'sriya', password: 'sriya@2024', name: 'Sriya Reddy' },
];

// ─── Mock Jobs Data ──────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 'j1',
    title: 'Frontend Engineer',
    companyName: 'Google',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '10 - 20 LPA',
    rating: 4,
    applyUrl: 'https://careers.google.com/jobs/results/',
    jobDescription: 'Google front-end engineers work closely with designers, UX researchers, product managers, and back-end engineers to create products and tools that help users and businesses. You will integrate user-facing elements using server-side logic by understanding and optimising them for performance and scale.',
    skills: [
      { name: 'React JS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/react-img.png' },
      { name: 'JavaScript', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png' },
      { name: 'CSS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/css3-img.png' },
    ],
    lifeAtCompany: {
      description: 'We help talented people from around the world solve big problems. Our teams include engineers, designers, researchers, and business people, all focused on users.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/life-google-img.png',
    },
    similarJobs: ['j2', 'j5'],
  },
  {
    id: 'j2',
    title: 'Backend Developer',
    companyName: 'Netflix',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '18 - 30 LPA',
    rating: 4,
    applyUrl: 'https://jobs.netflix.com/search',
    jobDescription: 'We want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV shows, movies and documentaries. Our mission is to deliver quality entertainment experiences that move people.',
    skills: [
      { name: 'Node.js', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/nodejs-img.png' },
      { name: 'PostgreSQL', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/postgresql-img.png' },
      { name: 'Docker', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png' },
    ],
    lifeAtCompany: {
      description: 'We are a team of passionate people whose goal is to improve everyone\'s life through disruptive products. We build great products to solve your business problems.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png',
    },
    similarJobs: ['j1', 'j6'],
  },
  {
    id: 'j3',
    title: 'iOS Developer',
    companyName: 'Swiggy',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/swiggy-img.png',
    location: 'Delhi',
    employmentType: 'Internship',
    packagePerAnnum: '5 - 8 LPA',
    rating: 3,
    applyUrl: 'https://careers.swiggy.com/',
    jobDescription: 'Build and maintain mobile applications on iOS platform. Work with cross-functional teams to deliver high-quality features for millions of users.',
    skills: [
      { name: 'Swift', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/swift-img.png' },
    ],
    lifeAtCompany: {
      description: 'Swiggy is on a mission to make food accessible to everyone, everywhere through a magical, hyperlocal delivery experience.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/swiggy-img.png',
    },
    similarJobs: ['j2'],
  },
  {
    id: 'j4',
    title: 'DevOps Engineer',
    companyName: 'Flipkart',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png',
    location: 'Pune',
    employmentType: 'Part Time',
    packagePerAnnum: '12 - 18 LPA',
    rating: 4,
    applyUrl: 'https://www.flipkartcareers.com/',
    jobDescription: 'Manage cloud infrastructure, CI/CD pipelines, and help engineering teams ship faster. Experience with Kubernetes and AWS required.',
    skills: [
      { name: 'AWS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png' },
      { name: 'Docker', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png' },
    ],
    lifeAtCompany: {
      description: 'Flipkart is India\'s leading e-commerce marketplace, offering over 150 million products across 80+ categories.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png',
    },
    similarJobs: ['j2'],
  },
  {
    id: 'j5',
    title: 'Full Stack Developer',
    companyName: 'Zomato',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/zomato-img.png',
    location: 'Mumbai',
    employmentType: 'Freelance',
    packagePerAnnum: '8 - 14 LPA',
    rating: 3,
    applyUrl: 'https://www.zomato.com/careers',
    jobDescription: 'Build scalable web applications using React and Node.js. You will own features end-to-end from design to deployment.',
    skills: [
      { name: 'React JS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/react-img.png' },
      { name: 'Node.js', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/nodejs-img.png' },
    ],
    lifeAtCompany: {
      description: 'Zomato is a restaurant aggregator and food delivery start up founded in 2008.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/zomato-img.png',
    },
    similarJobs: ['j1', 'j3'],
  },
  {
    id: 'j6',
    title: 'Machine Learning Engineer',
    companyName: 'Razorpay',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/razorpay-img.png',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '20 - 40 LPA',
    rating: 4,
    applyUrl: 'https://razorpay.com/jobs/',
    jobDescription: 'Build ML models for fraud detection, credit scoring, and recommendation systems. Work with petabytes of transaction data.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
    ],
    lifeAtCompany: {
      description: 'Razorpay is the only payments solution in India that allows businesses to accept, process and disburse payments with its product suite.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/razorpay-img.png',
    },
    similarJobs: ['j2', 'j10'],
  },

  // ── New Data & AI roles ──────────────────────────────────────────────────
  {
    id: 'j7',
    title: 'Data Analyst',
    companyName: 'Amazon',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '8 - 14 LPA',
    rating: 4,
    applyUrl: 'https://www.amazon.jobs/en/job_categories/business-intelligence',
    jobDescription: 'Analyze large datasets to uncover trends and insights that drive business decisions. Build dashboards and reports using SQL, Excel, and visualization tools to support stakeholders across the organization.',
    skills: [
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'Tableau', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8242/8242967.png' },
    ],
    lifeAtCompany: {
      description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    similarJobs: ['j8', 'j9'],
  },
  {
    id: 'j8',
    title: 'Data Scientist',
    companyName: 'Microsoft',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '22 - 38 LPA',
    rating: 5,
    applyUrl: 'https://careers.microsoft.com/v2/global/en/search-results?keywords=data%20scientist',
    jobDescription: 'Design and implement statistical models and machine learning algorithms to solve complex business problems. Collaborate with engineering and product teams to deploy models into production and measure impact.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'Machine Learning', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618827.png' },
      { name: 'Azure', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
    ],
    lifeAtCompany: {
      description: 'Microsoft\'s mission is to empower every person and organization on the planet to achieve more through technology and innovation.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    },
    similarJobs: ['j7', 'j9'],
  },
  {
    id: 'j9',
    title: 'AI Engineer',
    companyName: 'OpenAI',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    location: 'Remote',
    employmentType: 'Full Time',
    packagePerAnnum: '35 - 60 LPA',
    rating: 5,
    applyUrl: 'https://openai.com/careers/search',
    jobDescription: 'Work on cutting-edge AI systems including large language models. Design training pipelines, optimize model performance, and collaborate with researchers to bring frontier AI capabilities into production.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'PyTorch', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png' },
      { name: 'GenAI', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618887.png' },
    ],
    lifeAtCompany: {
      description: 'OpenAI\'s mission is to ensure that artificial general intelligence benefits all of humanity through safe and broadly distributed AI.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    },
    similarJobs: ['j8', 'j10'],
  },
  {
    id: 'j10',
    title: 'Generative AI Engineer',
    companyName: 'NVIDIA',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    location: 'Pune',
    employmentType: 'Full Time',
    packagePerAnnum: '25 - 45 LPA',
    rating: 5,
    applyUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite',
    jobDescription: 'Build and fine-tune large language models and generative AI applications. Work with transformer architectures, prompt engineering, RAG pipelines, and GPU-accelerated training infrastructure.',
    skills: [
      { name: 'PyTorch', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png' },
      { name: 'LLMs', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618887.png' },
      { name: 'CUDA', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Nvidia_CUDA_Logo.jpg' },
    ],
    lifeAtCompany: {
      description: 'NVIDIA pioneered accelerated computing to tackle challenges no one else can solve, from AI to robotics to digital biology.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    },
    similarJobs: ['j9', 'j6'],
  },
  {
    id: 'j11',
    title: 'Machine Learning Engineer (MLE)',
    companyName: 'Meta',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '30 - 55 LPA',
    rating: 5,
    applyUrl: 'https://www.metacareers.com/jobs/',
    jobDescription: 'Develop and deploy machine learning systems at massive scale powering recommendation, ranking, and content understanding across Meta\'s family of apps. Partner with research teams to productionize new ML techniques.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'TensorFlow', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg' },
      { name: 'Machine Learning', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618827.png' },
    ],
    lifeAtCompany: {
      description: 'Meta builds technologies that help people connect, find communities, and grow businesses around the world.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    },
    similarJobs: ['j9', 'j8'],
  },
  {
    id: 'j12',
    title: 'Data Engineer',
    companyName: 'Uber',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '18 - 32 LPA',
    rating: 4,
    applyUrl: 'https://www.uber.com/careers/list/',
    jobDescription: 'Design, build, and maintain scalable data pipelines and ETL workflows. Work with distributed systems to process billions of events daily and ensure data quality across the analytics platform.',
    skills: [
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { name: 'Spark', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' },
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
    ],
    lifeAtCompany: {
      description: 'Uber is reimagining how people and things move across cities, building technology that connects riders, drivers, and delivery partners.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg',
    },
    similarJobs: ['j7', 'j13'],
  },
  {
    id: 'j13',
    title: 'Software Development Engineer (SDE)',
    companyName: 'Amazon',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '20 - 35 LPA',
    rating: 4,
    applyUrl: 'https://www.amazon.jobs/en/job_categories/software-development',
    jobDescription: 'Design, develop, and operate large-scale distributed systems. Write high-quality, scalable code, participate in design reviews, and own services end-to-end from development through production support.',
    skills: [
      { name: 'Java', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
      { name: 'AWS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png' },
      { name: 'Data Structures', imageUrl: 'https://cdn-icons-png.flaticon.com/512/2620/2620647.png' },
    ],
    lifeAtCompany: {
      description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    similarJobs: ['j12', 'j7'],
  },
  {
    id: 'j14',
    title: 'Database Administrator (DBA)',
    companyName: 'Oracle',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '12 - 22 LPA',
    rating: 4,
    applyUrl: 'https://www.oracle.com/careers/',
    jobDescription: 'Manage, monitor, and optimize relational and NoSQL databases. Ensure high availability, backup/recovery, security, and performance tuning across production database environments.',
    skills: [
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { name: 'PostgreSQL', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/postgresql-img.png' },
      { name: 'Oracle DB', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
    ],
    lifeAtCompany: {
      description: 'Oracle offers integrated suites of applications plus secure, autonomous infrastructure in the Oracle Cloud.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    },
    similarJobs: ['j12', 'j4'],
  },
  {
    id: 'j15',
    title: 'Deep Learning Engineer',
    companyName: 'NVIDIA',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '28 - 50 LPA',
    rating: 5,
    applyUrl: 'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite',
    jobDescription: 'Research and implement deep neural network architectures for computer vision, NLP, and speech applications. Optimize models for inference on GPU hardware and contribute to open-source deep learning frameworks.',
    skills: [
      { name: 'PyTorch', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Pytorch_logo.png' },
      { name: 'Deep Learning', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618827.png' },
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
    ],
    lifeAtCompany: {
      description: 'NVIDIA pioneered accelerated computing to tackle challenges no one else can solve, from AI to robotics to digital biology.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    },
    similarJobs: ['j10', 'j11'],
  },
  {
    id: 'j16',
    title: 'Software Development Engineer (SDE-1)',
    companyName: 'Amazon',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Bengaluru / Hyderabad / Gurugram',
    employmentType: 'Full Time',
    packagePerAnnum: '18 - 32 LPA',
    rating: 4,
    applyUrl: 'https://www.amazon.jobs/en/search?base_query=SDE-1&loc_query=India',
    jobDescription: 'Amazon is hiring SDE-1 engineers across Bengaluru, Hyderabad and Gurugram. You will design and build features for high-traffic services, write clean and testable code, and work closely with senior engineers on system design.',
    skills: [
      { name: 'Java', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
      { name: 'Data Structures', imageUrl: 'https://cdn-icons-png.flaticon.com/512/2620/2620647.png' },
      { name: 'AWS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png' },
    ],
    lifeAtCompany: {
      description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    similarJobs: ['j13', 'j7'],
  },
  {
    id: 'j17',
    title: 'Applied Scientist - Machine Learning',
    companyName: 'Amazon',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '35 - 65 LPA',
    rating: 5,
    applyUrl: 'https://www.amazon.jobs/en/search?base_query=Applied+Scientist+Machine+Learning&loc_query=India',
    jobDescription: 'Join Amazon\'s International Machine Learning team to build models that personalize shopping experiences for hundreds of millions of customers. Research, prototype, and deploy ML solutions at scale, partnering closely with engineering teams.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'Machine Learning', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618827.png' },
      { name: 'AWS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png' },
    ],
    lifeAtCompany: {
      description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    similarJobs: ['j8', 'j9'],
  },
  {
    id: 'j18',
    title: 'Data Engineer - IN Data Engineering & Analytics',
    companyName: 'Amazon',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '20 - 36 LPA',
    rating: 4,
    applyUrl: 'https://www.amazon.jobs/en/search?base_query=Data+Engineer&loc_query=India',
    jobDescription: 'Build and own large-scale data pipelines and warehousing solutions that power business intelligence and reporting across Amazon India. Work with petabyte-scale datasets using distributed processing frameworks.',
    skills: [
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { name: 'Spark', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' },
      { name: 'AWS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png' },
    ],
    lifeAtCompany: {
      description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    similarJobs: ['j12', 'j7'],
  },
  {
    id: 'j19',
    title: 'Data Scientist II',
    companyName: 'Microsoft',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '25 - 42 LPA',
    rating: 5,
    applyUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=data%20scientist&l=India',
    jobDescription: 'Apply advanced statistical and machine learning techniques to analyze product telemetry, drive experimentation strategy, and influence product roadmap decisions across Microsoft\'s cloud and AI products.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { name: 'Azure', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
    ],
    lifeAtCompany: {
      description: 'Microsoft\'s mission is to empower every person and organization on the planet to achieve more through technology and innovation.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    },
    similarJobs: ['j8', 'j9'],
  },
  {
    id: 'j20',
    title: 'Software Engineer - AI/ML',
    companyName: 'Microsoft',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    location: 'Bengaluru / Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '24 - 40 LPA',
    rating: 5,
    applyUrl: 'https://jobs.careers.microsoft.com/global/en/search?q=AI%20ML%20engineer&l=India',
    jobDescription: 'Design and build AI-powered features across Microsoft 365 and Azure AI services. Collaborate with research teams to integrate large language models into production products used by millions.',
    skills: [
      { name: 'C#', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6132/6132221.png' },
      { name: 'Machine Learning', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618827.png' },
      { name: 'Azure', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
    ],
    lifeAtCompany: {
      description: 'Microsoft\'s mission is to empower every person and organization on the planet to achieve more through technology and innovation.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    },
    similarJobs: ['j19', 'j9'],
  },
  {
    id: 'j21',
    title: 'Software Development Engineer II',
    companyName: 'Flipkart',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '22 - 38 LPA',
    rating: 4,
    applyUrl: 'https://www.flipkartcareers.com/#!/joblist',
    jobDescription: 'Own and scale backend services that power Flipkart\'s e-commerce platform during high-traffic events like Big Billion Days. Mentor junior engineers and drive technical design decisions for your team.',
    skills: [
      { name: 'Java', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
      { name: 'Microservices', imageUrl: 'https://cdn-icons-png.flaticon.com/512/2620/2620647.png' },
      { name: 'AWS', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png' },
    ],
    lifeAtCompany: {
      description: 'Flipkart is India\'s leading e-commerce marketplace, offering over 150 million products across 80+ categories.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png',
    },
    similarJobs: ['j4', 'j13'],
  },
  {
    id: 'j22',
    title: 'Data Scientist',
    companyName: 'Flipkart',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png',
    location: 'Bengaluru',
    employmentType: 'Full Time',
    packagePerAnnum: '20 - 35 LPA',
    rating: 4,
    applyUrl: 'https://www.flipkartcareers.com/#!/joblist',
    jobDescription: 'Build demand forecasting, pricing, and recommendation models that directly impact Flipkart\'s supply chain and customer experience. Work with massive transaction datasets across categories.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'Machine Learning', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618827.png' },
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
    ],
    lifeAtCompany: {
      description: 'Flipkart is India\'s leading e-commerce marketplace, offering over 150 million products across 80+ categories.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/flipkart-img.png',
    },
    similarJobs: ['j8', 'j7'],
  },
  {
    id: 'j23',
    title: 'GenAI Solutions Engineer',
    companyName: 'Google',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png',
    location: 'Bengaluru / Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '30 - 50 LPA',
    rating: 5,
    applyUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=generative%20ai&location=India',
    jobDescription: 'Partner with enterprise customers to design and deploy generative AI solutions built on Google Cloud\'s Vertex AI and Gemini models. Translate business problems into LLM-powered applications and RAG architectures.',
    skills: [
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'GenAI', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8618/8618887.png' },
      { name: 'GCP', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
    ],
    lifeAtCompany: {
      description: 'We help talented people from around the world solve big problems. Our teams include engineers, designers, researchers, and business people, all focused on users.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/life-google-img.png',
    },
    similarJobs: ['j9', 'j10'],
  },
  {
    id: 'j24',
    title: 'Data Analyst, Trust & Safety',
    companyName: 'Google',
    companyLogoUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png',
    location: 'Hyderabad',
    employmentType: 'Full Time',
    packagePerAnnum: '14 - 24 LPA',
    rating: 5,
    applyUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=data%20analyst&location=India',
    jobDescription: 'Analyze large-scale datasets to identify trends in policy violations and abuse patterns. Build SQL-based dashboards and work cross-functionally with policy and engineering teams to improve platform safety.',
    skills: [
      { name: 'SQL', imageUrl: 'https://cdn-icons-png.flaticon.com/512/4248/4248443.png' },
      { name: 'Python', imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png' },
      { name: 'Data Visualization', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8242/8242967.png' },
    ],
    lifeAtCompany: {
      description: 'We help talented people from around the world solve big problems. Our teams include engineers, designers, researchers, and business people, all focused on users.',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/jobby-app/life-google-img.png',
    },
    similarJobs: ['j7', 'j23'],
  },
];

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error_msg: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error_msg: 'Invalid JWT Token' });
  }
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ error_msg: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ jwt_token: token, name: user.name });
});

// GET /profile
app.get('/profile', authMiddleware, (req, res) => {
  const user = USERS.find(u => u.id === req.user.id);
  res.json({
    name: user.name,
    profileImageUrl: 'https://assets.ccbp.in/frontend/react-js/male-avatar-img.png',
    shortBio: 'Passionate developer looking for exciting opportunities',
  });
});

// GET /jobs  — supports ?search=&employment_type=&minimum_package=
app.get('/jobs', authMiddleware, (req, res) => {
  const { search = '', employment_type = '', minimum_package = '' } = req.query;
  let results = [...JOBS];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.companyName.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.some(s => s.name.toLowerCase().includes(q))
    );
  }

  if (employment_type) {
    const types = employment_type.split(',').map(t => t.trim());
    results = results.filter(j => types.includes(j.employmentType));
  }

  if (minimum_package) {
    const packageMap = { '10': 10, '20': 20, '30': 30 };
    const min = packageMap[minimum_package] || 0;
    results = results.filter(j => {
      const maxPkg = parseFloat(j.packagePerAnnum.split(' - ')[1]);
      return maxPkg >= min;
    });
  }

  res.json({ jobs: results.map(j => ({
    id: j.id,
    title: j.title,
    companyName: j.companyName,
    companyLogoUrl: j.companyLogoUrl,
    location: j.location,
    employmentType: j.employmentType,
    packagePerAnnum: j.packagePerAnnum,
    rating: j.rating,
    jobDescription: j.jobDescription.substring(0, 200) + '...',
  })) });
});

// GET /jobs/:id
app.get('/jobs/:id', authMiddleware, (req, res) => {
  const job = JOBS.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ error_msg: 'Job not found' });
  const similar = job.similarJobs.map(sid => {
    const s = JOBS.find(j => j.id === sid);
    return s ? { id: s.id, title: s.title, companyName: s.companyName, companyLogoUrl: s.companyLogoUrl, location: s.location, employmentType: s.employmentType, rating: s.rating } : null;
  }).filter(Boolean);
  res.json({ job_details: job, similar_jobs: similar });
});

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`\n✅ JobHunt API → http://localhost:${PORT}\n   Login: rahul / rahul@2021\n`));
