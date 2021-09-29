const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con => {
  // console.log(con.connections);
  console.log('DB connection successfull')
});

const app = require("./app");
console.log(app.get('env'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}... 🚀`);
});
