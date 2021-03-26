const express = require('express');
require('dotenv').config({ path: '.env' });
const connectDB = require('./db');

connectDB();

const app = express();
app.use(express.json({ extended: false }));

app.use('/api/user', require('./api/user'));
app.use('/api/event', require('./api/event'));
app.get('/', (req, res) => {
  res.send('working');
});

const port = process.env.port || 5000;
app.listen(port, () => console.log('server up'));
