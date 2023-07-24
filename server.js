require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

// connectDB()
require('./config/dbConn')
app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.get('/data', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.json("no thing no")
});        
                                
// اكمل الكود في react 
// اذا اضغط على (Employee Login)ينقلني الى صفحة login التي تحتوي في الاعلى على جهة اليسار عبارة (Employee Login) وتحتها ليبل عبارة (userName) وتحتها input لادخال الاسم المحفوظ في(setUsers)  وتحتها ليبل ال(password) وتحتها input لادخال كلمة السر  المخزنه في (setUsers)  وتحتها ىبوتون تسجيل الدخول لتسجيل الدخول الى الواجهة التي بعدها اذا كانت فعلا المعلومات صحيحه وكانت فعلا مخزنه في قاعدة البيانات  وتحتها مربع صغير وبجانبها عبارة(trust this device) وفي الاسفل عبارة (back to home ) عند الضغط عليه يعود بي  الى الصفحة الاولى

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
