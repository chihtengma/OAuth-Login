require("dotenv").config();

const config = {
   FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
   FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET
};

const FACEBOOK_AUTH_OPTIONS = {
   callbackURL: "/auth/facebook/callback",
   clientID: config.FACEBOOK_APP_ID,
   clientSecret: config.FACEBOOK_APP_SECRET
};

function verifyFacebookCallback(accessToken, refreshToken, profile, done) {
   console.log("Facebook Profile: ", profile);
   done(null, profile);
}

module.exports = {
   FACEBOOK_AUTH_OPTIONS,
   verifyFacebookCallback
};
