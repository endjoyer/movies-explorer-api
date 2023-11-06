require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { limiterSettings } = require('./utils/constants');
const { DB_URL } = require('./utils/constants');
const { notFound } = require('./utils/errorsTest');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/movies');
const { NotFoundError } = require('./utils/errors/index');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 5000 } = process.env;
const app = express();
const limiter = rateLimit(limiterSettings);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://movies-endjoyer.vercel.app',
      'https://movies-endjoyer.vercel.app',
    ],
    credentials: true,
    maxAge: 60,
  }),
);

app.use(helmet());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use(requestLogger);

app.use(limiter);

app.use(routesUsers);
app.use(routesCards);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError(notFound)));
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
