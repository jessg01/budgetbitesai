const express = require('express');
const app = express();
const userRoute = require('./routes/user.route');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use("/", userRoute);

//Connecting to db
mongoose.connect("mongodb+srv://admin:admin@one.apo14.mongodb.net/BudgetBites?retryWrites=true&w=majority&appName=One")
.then(()=> console.log("successfully connected to db"))
.catch((err) => console.log(err))

//Connect to port
app.listen(5000, console.log("successfully connected to port"));