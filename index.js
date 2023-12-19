const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Use the cors middleware
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());





// Routes
app.use('/api', require('./routes/resumeRoutes'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




