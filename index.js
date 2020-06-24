require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();


const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
require("./middleware/cloundinary");

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const send = require('./validate/sms.validate');


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

app.get("/api/", (req, res) => res.send("index"));
app.use("/api/auth", authRoutes);
app.use("/api/housewifes", housewifeRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/comments", commentRoutes);



app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);





