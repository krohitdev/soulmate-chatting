require('dotenv').config()


const mongoose = require('mongoose');
const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });

const app = require('./app');

// Connect to db
mongoose
  .connect('mongodb://localhost/chatting', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`app has started on ${port}`)
);

