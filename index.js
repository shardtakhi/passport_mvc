import express from "express";
const app = express();
import route from "./module/route/routes.js";

import passport from 'passport'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import pass from "./middleware/passport.js";

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secret'))
app.use(
  session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message')
  res.locals.errors_message = req.flash('errors_message')
  res.locals.error = req.flash('error');
  next();
})


pass()

app.set('view engine' , 'ejs');

app.use("/" , route)

const PORT = process.env.PORT || 5000
app.listen(PORT , () => {console.log("the server is running on the 5000");})