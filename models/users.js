import mongoose from 'mongoose'

// create schema
const userschema = new mongoose.Schema({
  // Model attributes are defined here
  username: {
    type: String
  },
  useremail: {
    type: String
  },
  password: {
    type: String
  },
 token: {
    type: String,
    default: "0"
  },
  
  
})

// export models as users name
export default mongoose.model('users', userschema)
