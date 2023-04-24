import nodemailer from 'nodemailer'
import mydata from '../core/data.js'
 
const SendEmail = (useremail, otp) => {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: mydata.myemail,
        pass: mydata.mypass
      }
    })
  
    const mailoption = {
      from: mydata.myemail,
      to: useremail,
      subject: 'demo email',
      text: `OTP ${otp}`
    }
  
    transport.sendMail(mailoption, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('email has been send'.info.response)
      }
    })
  }

  export default SendEmail;