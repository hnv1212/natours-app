const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successfull');
  });

const app = require('./app');
console.log(app.get('env'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 🤬 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    // using .close() to give server time to finish all request are handling or pending
    process.exit(1);
  });
});
