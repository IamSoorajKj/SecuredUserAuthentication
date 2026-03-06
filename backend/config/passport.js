import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../models/userModel.js";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const highResAvatar = profile.photos[0].value.replace(/=s\d+.*$/, "=s400-c") || profile.photos[0].value;
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Check if a user with this email already exists
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link the Google account to the existing user
          user.googleId = profile.id;
          user.isLoggedIn = true;
          user.avatar = highResAvatar || user.avatar;
          user.isVerified = true;
          await user.save();
        } else {
          // Create new user if doesn't exist at all
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: highResAvatar,
            isLoggedIn: true,
            isVerified: true
          });
        }
      } else {
        // Update existing user's login status and avatar (in case it changed)
        user.isLoggedIn = true;
        user.avatar = highResAvatar || user.avatar;
        await user.save();
      }

      return cb(null, user);

    } catch (error) {
      return cb(error, null)
    }

  }
));