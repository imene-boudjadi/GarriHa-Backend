const express = require('express');
const pool = require("./database.js");


const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const userController = require("./Controllers/userController"); 
const ParkingController = require("./Controllers/ParkingController"); 
const ReservationController = require("./Controllers/ReservationController"); 


app.get('/test', function (req, res) {
    res.send('Hello, World!');
});

app.use("/user", userController);
app.use("/Parking", ParkingController);
app.use("/Reservation", ReservationController);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
