const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serves index.html automatically on '/'
app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});