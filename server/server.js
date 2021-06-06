const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.log('Cannot connect to the database!', error);
    process.exit();
  });

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to simple tinder app.' });
});
// User routes
require('./app/routes/user.routes')(app);
// History routes
require('./app/routes/history.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
