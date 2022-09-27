import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import route from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());

// app.use(cors());

dotenv.config();

// connect mongoosedb alat
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connect to DB');
    })
    .catch((err) => {
      throw err;
    });
};

// body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router init
route(app);

// when api err return status and mess
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log('Server connect to port 8800');
});
