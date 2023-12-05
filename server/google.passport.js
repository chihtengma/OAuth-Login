require("dotenv").config();

// Social login's configuration
const config = {
   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

const GOOGLE_AUTH_OPTIONS = {
   callbackURL: "/auth/google/callback",
   clientID: config.GOOGLE_CLIENT_ID,
   clientSecret: config.GOOGLE_CLIENT_SECRET
};

function verifyGoogleCallback(accessToken, refreshToken, profile, done) {
   console.log("Google Profile: ", profile);
   done(null, profile);
}

module.exports = {
   GOOGLE_AUTH_OPTIONS,
   verifyGoogleCallback
};
