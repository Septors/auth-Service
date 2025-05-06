import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // или твой фронтенд
    credentials: true
  }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());
app.use('/api',authRoutes);

export default app;
