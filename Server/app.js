import morgan from "morgan";
import authRoute from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import likeRoutes from "./src/routes/likeRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import { initDb } from "./src/db/sequelize.js";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import provider from "passport-google-oauth20";
import session from "express-session";
import { User } from "./src/db/sequelize.js";

const GoogleStrategy = provider.Strategy;
dotenv.config();

const app = express();
const port = process.env.PORT || "9001";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KET,
  })
);
// app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({ where: { email: profile._json.email } })
        .then((user) => {
          if (!user) {
            return User.create({
              email: profile._json.email,
              firstName: profile._json.family_name,
              lastname: profile._json.given_name,
              picturePath: profile._json.picture,
            }).then((userCreate) => {
              return done(null, profile);
            });
          }
        })
        .catch((err) => console.log(err));
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/google/failure",
  })
);
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return console.log(err);
    }
    return res.status(200);
  });
});

app.use("/auth", authRoute);
app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

initDb();

app.listen(port, () =>
  console.log(`Notre application est démarrée sur : http://localhost:${port}`)
);
