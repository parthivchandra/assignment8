require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');

const data = {
  slug: 'main',
  name: 'Parthiv Chandran',
  initials: 'PC',
  siteTitle: 'Parthiv Chandran | Portfolio',

  welcomeText: 'WELCOME TO MY PORTFOLIO',
  headline: 'Bvoc Software Development Graduate | Aspiring Software Developer',
  heroIntro:
    'Motivated and detail-oriented Computer Science graduate passionate about programming, problem solving and technology.',
  cardLines: ['Bvoc Software Development', 'Software Developer Aspirant'],
  quickLinks: [
    { icon: '👩‍💻', title: 'About Me', description: 'Learn about my education and career objective.', url: '/about' },
    { icon: '💻', title: 'Skills', description: 'Explore my programming and technical skills.', url: '/skills' },
    { icon: '📩', title: 'Contact Me', description: 'Get in touch with me for opportunities.', url: '/contact' }
  ],

  careerObjective:
    'Motivated and detail-oriented Computer Science graduate seeking a software developer role where I can apply my programming skills, problem-solving abilities and passion for technology to develop efficient and user-focused applications.',
  education: [
    {
      degree: 'Bvoc Software Development',
      institution: 'Farook College, Kozhikode',
      cgpa: '6.0'
    }
  ],
  whoAmI:
    'I am a Bvoc Software Development graduate interested in software development and programming. I enjoy learning new technologies and improving my technical and problem-solving skills. My goal is to build useful and efficient applications while continuously developing my knowledge.',

  // PLACEHOLDER: skills.html was not in the uploaded files. Replace with your real skills.
  skills: [
    { category: 'Programming Languages', items: ['Java', 'Python', 'JavaScript'] },
    { category: 'Web Technologies', items: ['HTML', 'CSS', 'Node.js'] },
    { category: 'Databases', items: ['MongoDB', 'MySQL'] }
  ],

  contactIntro:
    'I am open to opportunities in software development and technology. Feel free to contact me.',
  address: 'Nandanam House Nochad Po Kozhikode Kerala, India 673614',
  phone: '9072273282',
  email: 'iamparthivchandran@gmail.com',

  footerText: '© 2026 Parthiv Chandran | Personal Portfolio'
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Profile.findOneAndUpdate({ slug: 'main' }, data, { upsert: true, new: true });
    console.log('Profile seeded.');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
