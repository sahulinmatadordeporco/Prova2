const express = require('express');
const fs = require('fs');
const { registrarLog } = require('./script.js'); 
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});