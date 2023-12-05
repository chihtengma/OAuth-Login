require("dotenv").config();

const config = {
   GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
   GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
};

const GITHUB_AUTH_OPTIONS = {
   callbackURL: "/auth/github/callback",
   clientID: config.GITHUB_CLIENT_ID,
   clientSecret: config.GITHUB_CLIENT_SECRET
};

function verifyGitHubCallback(accessToken, refreshToken, profile, done) {
   console.log("Github: ", profile);
   done(null, profile);
}

module.exports = {
   GITHUB_AUTH_OPTIONS,
   verifyGitHubCallback
};
