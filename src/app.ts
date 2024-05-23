// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

import express, { Application, Request, Response } from "express";
import cors from "cors";
// import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);

app.get("/", (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
