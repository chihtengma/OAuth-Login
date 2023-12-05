const fs = require("fs");
const path = require("path");
const https = require("https");
const helmet = require("helmet");
const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const GitHubStrategy = require("passport-github2");
const FacebookStrategy = require("passport-facebook");
const { Strategy } = require("passport-google-oauth20");
const { GOOGLE_AUTH_OPTIONS, verifyGoogleCallback } = require("./google.passport");
const { GITHUB_AUTH_OPTIONS, verifyGitHubCallback } = require("./github.passport");
const { FACEBOOK_AUTH_OPTIONS, verifyFacebookCallback } = require("./facebook.passport");

// Requiring .env file
require("dotenv").config();

const PORT = 3000;

// Keys for the session cookie from .env file
const sessionConfig = {
   COOKIE_KEY_1: process.env.COOKIE_KEY_1,
   COOKIE_KEY_2: process.env.COOKIE_KEY_2
};

passport.use(new Strategy(GOOGLE_AUTH_OPTIONS, verifyGoogleCallback));
passport.use(new FacebookStrategy(FACEBOOK_AUTH_OPTIONS, verifyFacebookCallback));
passport.use(new GitHubStrategy(GITHUB_AUTH_OPTIONS, verifyGitHubCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
   // Only save the user's id because for the simplicity
   // If we have a user database, we can check if the user exists in the database
   // If user is not exists, we create a new user
   done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
   // If we have a user database, we can use this id to search the corresponding user
   // For example, User.findById(id)
   done(null, id);
});

const app = express();

app.use(helmet());
app.use(
   cookieSession({
      name: "session",
      maxAge: 24 * 60 * 60 * 1000,
      keys: [sessionConfig.COOKIE_KEY_1, sessionConfig.COOKIE_KEY_2]
   })
);

// This is middleware function that fix the issues with regenerate and save from passport.js
app.use((req, res, next) => {
   if (req.session && !req.session.regenerate) {
      req.session.regenerate = (cb) => {
         cb();
      };
   }

   if (req.session && !req.session.save) {
      req.session.save = (cb) => {
         cb();
      };
   }

   next();
});
app.use(passport.initialize());
``;
app.use(passport.session());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static(path.join(__dirname, "../public")));

// Middleware function that check if user is logged in
function checkLoggedIn(req, res, next) {
   const isLoggedIn = req.isAuthenticated() && req.user;

   if (!isLoggedIn) {
      res.status(401).json({
         error: "You must log in!"
      });
   }
   next();
}

// Google Route
app.get(
   "/auth/google",
   passport.authenticate("google", {
      scope: ["email"]
   })
);

app.get(
   "/auth/google/callback",
   passport.authenticate("google", {
      failureRedirect: "/failure",
      successRedirect: "/"
   }),
   (req, res) => {
      console.log("Successfully log in with Google!");
   }
);

// Facebook Route
app.get(
   "/auth/facebook",
   passport.authenticate("facebook", {
      scope: ["email"]
   })
);

app.get(
   "/auth/facebook/callback",
   passport.authenticate("facebook", {
      failureRedirect: "/failure",
      successRedirect: "/"
   }),
   (req, res) => {
      console.log("Successfully log in with Facebook!");
   }
);

// GitHub Route
app.get(
   "/auth/github",
   passport.authenticate("github", {
      scope: ["user:email"]
   })
);

app.get(
   "/auth/github/callback",
   passport.authenticate(
      "github",
      {
         failureRedirect: "/failure",
         successRedirect: "/"
      },
      (req, res) => {
         console.log("Successfully log in with GitHub!");
      }
   )
);

app.get("/auth/logout", (req, res, next) => {
   // Passport.js has built-in logout function to removes req.user and clears any logged in session
   req.logout((err) => {
      if (err) {
         return next(err);
      }
      res.redirect("/");
   });
});

// This is just a simple route to check if the checkLoggedIn middleware works
app.get("/secret", checkLoggedIn, (req, res) => {
   return res.send("Personal secret value is 42");
});

app.get("/failure", (req, res) => {
   return res.send("Failed to log in!");
});

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../public/index.html"));
});

https
   .createServer(
      {
         key: fs.readFileSync("key.pem"),
         cert: fs.readFileSync("cert.pem")
      },
      app
   )
   .listen(PORT, () => {
      console.log(`Sever listenging to https://localhost:${PORT}`);
   });
