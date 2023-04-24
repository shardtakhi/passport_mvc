import express from 'express'
const route = express.Router();
import '../../core/conn.js';
import {Get_register, Register_User, Login_User, Logout_User, Welcome_User , Get_forget, check_email_forget} from '../controller/usercontroller.js';
import checkAuthenticated from '../../helper/checkAuthenticated.js'



// ===========================================
// manage routes
route.get('/', Get_register )
// register post route
route.post('/register', Register_User)
// login route
route.post('/loginuser', Login_User)

route.get('/forget', Get_forget)

route.post('/checkEmailForget', check_email_forget)


//get login rout
route.get('/login', (req, res) => {
  res.render('login')
})

route.get('/logout', Logout_User);


route.get('/success',checkAuthenticated , Welcome_User )


export default route
