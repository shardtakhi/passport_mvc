import users from '../../models/users.js';
import passport from 'passport';
import bcrypt from 'bcrypt';
const slatrounds = 10;

//==========================================================
// register page
const Get_register = async (req, res) => {
  res.render('index')
}

//======================================================================
// register user
const Register_User = (req, res) => {
  const { username, useremail, password, confirm_password } = req.body
  let err
  // let submit

  if (password != confirm_password) {
    const err = 'password not match'

    res.render('index', {title : "Add User",
      username: username,
      useremail: useremail,
      success_message: err
    })
    // res.redirect('/')
  }

  users.findOne({ useremail: useremail }).then(value => {
    if (value) {
      req.flash('success_message', 'useremail already exist')
      res.redirect('/')
    } else {
      try {
        // convert password in hash form
        let hash = bcrypt.hashSync(password, slatrounds)
        // create all felids
        users.create({
          username: username,
          useremail: useremail,
          password: hash
        })
        // if data submit
        // console.log({ user: 'Data Submit Successfully' })
        // err = 'Data Submit Successfully'
        // res.render('index', { err: err })

        //   req.flash(
        //     'success_message',
        //     'Data Submit Successfully ....please login'
        //   )
        res.redirect('/login')
      } catch (error) {
        //if data is not submit
        console.log('data not submit')
      }
    }
  })
}

//======================================================================
// Login_User

const Login_User = (req, res, next) => {
  // const {useremail  ,password } = req.body;
  // console.log(useremail , password);
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/success',
    failureFlash: true
  })(req, res, next)
}

//======================================================================
// Logout_User

const Logout_User = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/login')
      }
    })
  }
}

//======================================================================
// welcome_User

const Welcome_User = (req, res) => {
    res.render('welcome' , {username : req.user.username})
  }

  // import { Strategy as LocalStrategy } from 'passport-local';



  // passport.use(
  //   new LocalStrategy(
  //     {
  //       usernameField: 'useremail'
  //     },
  //     async (useremail, password, done) => {
  //       try {
  //         const user = await users.findOne({ useremail })
  
  //         if (!user) {
  //           return done(null, false, { message: 'Email doesnot match' })
  //         }
  
  //         const match = await bcrypt.compareSync(password, user.password)
  
  //         if (!match) {
  //           return done(null, false, { message: 'Wrong Password' })
  //         }
  
  //         return done(null, user, { message: 'Logged in Successfully' })
  //       } catch (error) {
  //         return done(error)
  //       }
  //     }
  //   )
  // )
  // //create local statergy
  
  // passport.serializeUser((users, done) => {
  //   if (users) {
  //     return done(null, users.id)
  //   }
  
  //   return done(null, false)
  // })
  
  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const user = await users.findById(id)
  //     done(null, user)
  //   } catch (err) {
  //     done(err, false)
  //   }
  // })


export { Get_register, Register_User, Login_User, Logout_User , Welcome_User }
