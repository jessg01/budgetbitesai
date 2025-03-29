const express = require('express');
const app = express();
const userRoute = require('./routes/user.route');
const mongoose = require('mongoose');
const cors = require('cors');
const pythonScriptPath = './budgetbite_ai2.py';
const { exec } = require('child_process');
const path = require('path');

app.use(express.json());
app.use(cors());

app.use("/", userRoute);

//Connecting to db
mongoose.connect("mongodb+srv://admin:admin@one.apo14.mongodb.net/BudgetBites?retryWrites=true&w=majority&appName=One")
.then(()=> console.log("successfully connected to db"))
.catch((err) => console.log(err))

//Connect to port
app.listen(5000, console.log("successfully connected to port"));


app.post('/dashboard', (req, res) => {
    // Specify the path to your Python script
    const pythonScriptPath = path.join(__dirname, './budgetbite_ai2.py');
    
    // Call the Python script using child_process.exec
    exec(`python3 ${pythonScriptPath}`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Python script:', err);
        return res.status(500).json({ error: 'Python script execution failed' });
      }
      if (stderr) {
        console.error('stderr:', stderr);
        return res.status(500).json({ error: 'Python script produced an error' });
      }
  
      // Send the output from the Python script back to the client
      res.json({ result: stdout });
    });
  });