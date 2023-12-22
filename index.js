//for sign up or login post request
// back end to front end get

//err0r => error connectingError: queryTxt EREFUSED cluster0.gfpscra.mongodb.net
//solution : add ip address
//encrypting user password before saving to database using bycript in user .js
const express = require('express');
const app = express();
const port = 3000;
//const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);
  
const cors = require ('cors'); 
require('./db');
require('./models/User');
require('./models/ColdStorage');
require('./models/OrderPlacement');
require('./models/Review');
require('./models/admin');
require('./models/storageStatus');
// Enable All CORS Requests
/* const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Authorization'],
};
app.use(cors(corsOptions)); 
app.use(cors()); */
//const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const requireToken = require('./Middlewares/AuthTokenRequired');
const OrderPlacement = require('./models/OrderPlacement');
const Review = require('./models/Review');
//adding 
//app.use (cors())
app.use (express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include Authorization header
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to handle URL-encoded data
//ending
app.use(bodyParser.json());
app.use(authRoutes);

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
    //res.send("  This is home page");
});
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for 'orderStatusUpdate' event from the frontend
  socket.on('orderStatusUpdate', ({ farmerId, status }) => {
    // Send a notification to the farmerId
    socket.broadcast.to(farmerId).emit('notification', { status });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
const VerificationCode = require('./models/VerificationCode'); // Adjust the path based on your project structure

async function validateVerificationCode(email, code) {
  try {
    const verificationEntry = await VerificationCode.findOne({ email, code });

    return verificationEntry !== null; // Returns true if a matching verification entry is found, false otherwise
  } catch (error) {
    console.error('Error validating verification code:', error);
    return false; // Return false in case of an error
  }
}

module.exports = validateVerificationCode;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
app.get('/order', (req,res) => {
  OrderPlacement.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
});
app.use(bodyParser.json({ limit: '10000000000000000000mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '1000000000000000000000mb', extended: true }));
