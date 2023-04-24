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


  //======================================================================
// welcome_User

const Get_forget = async (req, res) => {

  res.render('forget')


}
  //======================================================================
// welcome_User

const check_email_forget = async (req, res) => {

  const useremail =  req.body.useremail

  const checkemail = await users.findOne({useremail : useremail})

  if (checkemail) {
    const rendom_no = Math.floor(100000 * Math.random() + 900000);
    console.log(rendom_no);
    const updatOTP = await users.updateOne({useremail : useremail}, {$set : { token : rendom_no}} )

    

  }
  else{
    console.log("email not here");
  }







}



export { Get_register, Register_User, Login_User, Logout_User , Welcome_User, Get_forget , check_email_forget }
