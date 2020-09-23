require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();


const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("./middleware/cloundinary");

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const housewifeRoutes = require("./routes/housewife.route");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.route");
const orderRoutes = require("./routes/order.route");
const commentRoutes = require("./routes/comment.route");


const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("assets"));

app.get("/", (req, res) => res.send("Hello, Phúc nè"));
app.use("/api/auth", authRoutes);
app.use("/api/housewifes", housewifeRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);

const cron = require('cron');
const foodController = require('./controller/food.controller'); // check status

const job = new cron.CronJob({
    cronTime: '00 00 17 * * 0-6', // Chạy Jobs vào 17H hang ngay
    onTick: function () {
        foodController.checkStatus();
        console.log('Cron job runing...');
    },
    start: true,
    timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

job.start();

app.listen(port, () =>
    console.log(`Hometown flavor listening at http://localhost:${port}`)
);





