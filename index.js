require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
require('./middleware/cloundinary')

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const housewifeRoutes = require("./routes/housewife.route");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('assets'))

app.get('/api/', (req, res) => res.send('index'))
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/housewifes', housewifeRoutes);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))