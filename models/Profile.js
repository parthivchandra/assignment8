const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  cgpa: String
});

const skillGroupSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. "Programming Languages"
  items: [String]                              // e.g. ["Java", "Python"]
});

const quickLinkSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
  url: String
});

// A single document holds everything the site displays.
const profileSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'main', unique: true },

    name: { type: String, required: true },
    initials: String,
    siteTitle: String,

    // Home page
    welcomeText: String,
    headline: String,          // "Computer Science Graduate"
    heroIntro: String,
    cardLines: [String],       // lines shown under the name in the hero card
    quickLinks: [quickLinkSchema],

    // About page
    careerObjective: String,
    education: [educationSchema],
    whoAmI: String,

    // Skills page
    skills: [skillGroupSchema],

    // Contact page
    contactIntro: String,
    address: String,
    phone: String,
    email: String,

    footerText: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
