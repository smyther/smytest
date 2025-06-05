import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const app = express();
const port = 3000;

passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Here you would find or create a user in your database
  return done(null, profile);
}));

app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
});

app.get('/hello', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});