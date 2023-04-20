
import mongoose from 'mongoose' // import mongoose

// check connectino if connect
mongoose
  .connect('mongodb://127.0.0.1:27017/authentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connection fine')
  })
  .catch(() => {
    console.log('Not connect')
  })
