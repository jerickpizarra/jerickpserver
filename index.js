const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/error')
const {connectDB} = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB();

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/visitor', require('./routes/visitor'))
app.use('/api/user', require('./routes/user'))
app.use('/api/experience', require('./routes/experience'))
app.use('/api/project', require('./routes/project'))

app.use('/*', (req, res) =>
    res.status(404).json(
       { message: "404 Not Found" }
    )
);


app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))