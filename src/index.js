const express = require('express');
const app = express();

const port = process.env.PORT || 3000

const cors = require('cors')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cors({
    origin: "*"
}))

// router
app.use(require('./routes/index'))

app.listen(port)
console.log("listening on port " + port)
