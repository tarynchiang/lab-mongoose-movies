const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const ensureLogin = require("connect-ensure-login");

router.get('/signup', (req, res, next) => {

  res.render('userViews/signup');

})

router.post('/signup', (req, res, next) => {

  const thePassword = req.body.thePassword;
  const theUsername = req.body.theUsername;

  console.log(thePassword, theUsername)

  const salt = bcrypt.genSaltSync(12);
  const hashedPassWord = bcrypt.hashSync(thePassword, salt);

  User.findOne({username: "Taryn"}, (err, user) => {
      if (user != null) {
        req.flash('error', "the UserName is already taken.")
        res.redirect("/signup");
      } else {
        User.create({
            username: theUsername,
            password: hashedPassWord
          })
          .then(() => {
            console.log('Worked');
            res.redirect('/')
          })
          .catch((err) => {
            next(err);
          })
      }
    })
})

router.get('/login', (req, res, next) => {
  res.render("userViews/login");
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/movies",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res, next) => {
  req.logout();
  req.flash('success', "Successfully log out")
  res.redirect("/login");
})


router.get("/google/auth", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/userinfo.email"
      ]
}));


router.get("/google/auth/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/movies"
}));


router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("userViews/profile", {
    user: req.user
  });
});



module.exports = router;