const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require('body-parser');
const sequelize = require("./config/db");
const path = require("path");
// const { Server } = require('socket.io'); 

const authRoute = require('./routes/authRoute');
const productRouste = require("./routes/productRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Middleware
// app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) => {
     res.json({message: "Api is running"})
})

// Routes
app.use("/auth",authRoute);
app.use('/products',productRouste);
console.log('sever')

//  Create HTTP server
const server = http.createServer(app);

// Middleware

//  Connect to Database and Start Server
sequelize
  .sync({ alter: false })
  .then(() => {
    console.log('Database connected!');

    // Start HTTP and WebSocket server
    server.listen(5001, () => {
      console.log('Server running on http://localhost:5001');
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
