require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const Profile = require('./models/Profile');
const Message = require('./models/Message');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Load the profile once per request and expose it to every view.
async function loadProfile(req, res, next) {
  try {
    const profile = await Profile.findOne({ slug: 'main' }).lean();
    if (!profile) {
      return res
        .status(500)
        .send('No profile found in the database. Run "npm run seed" first.');
    }
    res.locals.profile = profile;
    res.locals.currentPath = req.path;
    next();
  } catch (err) {
    next(err);
  }
}

app.use(loadProfile);

app.get('/', (req, res) => res.render('index', { title: res.locals.profile.siteTitle }));

app.get('/about', (req, res) =>
  res.render('about', { title: `About Me | ${res.locals.profile.name}` })
);

app.get('/skills', (req, res) =>
  res.render('skills', { title: `Skills | ${res.locals.profile.name}` })
);

app.get('/contact', (req, res) =>
  res.render('contact', {
    title: `Contact | ${res.locals.profile.name}`,
    status: req.query.sent === '1' ? 'success' : req.query.error === '1' ? 'error' : null
  })
);

app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await Message.create({ name, email, subject, message });
    res.redirect('/contact?sent=1');
  } catch (err) {
    console.error('Message save failed:', err.message);
    res.redirect('/contact?error=1');
  }
});

// Old *.html links keep working
['about', 'skills', 'contact'].forEach((p) =>
  app.get(`/${p}.html`, (req, res) => res.redirect(301, `/${p}`))
);
app.get('/index.html', (req, res) => res.redirect(301, '/'));

app.use((req, res) => res.status(404).send('Page not found'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong.');
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
