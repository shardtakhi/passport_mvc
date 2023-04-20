import { Strategy as LocalStrategy } from 'passport-local'
import passport from 'passport'
import bcrypt from 'bcrypt'
import users from '../models/users.js';
import { err_msg } from '../core/constent.js';

const pass = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'useremail'
      },
      async (useremail, password, done) => {
        try {
          const user = await users.findOne({ useremail })

          if (!user) {
            return done(null, false, { message: err_msg.EmailNotOund })
          }

          const match = await bcrypt.compareSync(password, user.password)

          if (!match) {
            return done(null, false, { message: 'Wrong Password' })
          }

          return done(null, user, { message: 'Logged in Successfully' })
        } catch (error) {
          return done(error)
        }
      }
    )
  )
  //create local statergy

  passport.serializeUser((users, done) => {
    if (users) {
      return done(null, users.id)
    }

    return done(null, false)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await users.findById(id)
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
}

export default pass
