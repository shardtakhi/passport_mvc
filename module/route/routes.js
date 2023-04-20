import express from 'express'
const route = express.Router();
import '../../core/conn.js';
import {Get_register, Register_User, Login_User, Logout_User, Welcome_User} from '../controller/usercontroller.js';
import checkAuthenticated from '../../helper/checkAuthenticated.js'



// ===========================================
// manage routes
route.get('/', Get_register )
// register post route
route.post('/register', Register_User)
// login route
route.post('/loginuser', Login_User)

route.get('/login', (req, res) => {
  res.render('login')
})

route.get('/logout', Logout_User);


route.get('/success',checkAuthenticated , Welcome_User )


export default route
