const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

// Serves index.html automatically on '/'
app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
  console.log("*********************************************************************************************");
  console.log("*********************************************************************************************");
  console.log(`MONGODB_URI: ${uri}`);
  console.log(`Server running on port ${PORT}`);
  console.log("*********************************************************************************************");
  console.log("*********************************************************************************************");
});
