Certainly! Here's an improved version of the README, focusing on the usage of the code snippets you provided:

# Performance Evaluation System with [chart.js](https://www.chartjs.org/) Integration

This project includes functionality to create and update charts based on customer feedback. The backend is built with Express, and [chart.js](https://www.chartjs.org/) is utilized for rendering charts on the frontend.

## How to Use - Backend

### Installation

Ensure you have the required dependencies installed using npm:

```bash
npm install express mongoose socket.io
```
Server Configuration
Use the following code snippet to set up the Express server, routes, and Socket.io:

```javascript
// File: server.ts

import express from "express";
import { router } from "./routes/router";
import { AuthenticationDatabase } from "./database/mongoDB";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

// Configure routes
app.use(router);

// Create an HTTP server with Express
const serverWeb = http.createServer(app);

// Create a Socket.io instance and attach it to the server
export const io = new Server(serverWeb);

// Bootstrap the application
async function BootStrap() {
  // Connect to the MongoDB database
  await AuthenticationDatabase();

  // Handle Socket.io connections
  io.on("connection", (socket) => {
    console.log("Socket connected with id:", socket.id);
  });

  // Configure the server port
  const port = 8080;

  // Start the server
  serverWeb.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Initialize the application
BootStrap();
```
This code sets up an Express server, enables CORS, initializes routes, connects to MongoDB, and sets up Socket.io for real-time communication. Make sure to adjust the code based on your specific requirements and routes.
### Endpoints

- `/` - Test API
- `/create` - Create a database to store feedback data
- `/chart` - Convert customer feedback into data
- `/get` - Retrieve data to transform it into a chart

### Request for Data Storage

To store feedback data, send a JSON request:

```json
{
  "range": 4,
  "pergunta": "1"
}
```

Response:

```json
{
  "msg": "Obrigado pelo seu feedback"
}
```


### Code - Creating a Chart

Use the provided code snippet to create a chart. This initializes a new chart with predefined questions for a specified company:

```javascript
// File: createChartController.ts

import { Request, Response } from "express";
import { Model } from "../models/avaliable";

export async function CreateChart(req: Request, res: Response) {
  // Array of months for reference
  const meses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];

  const hoje = new Date();

  // Create a new chart model with initial data
  const newModel = new Model({
    company: [
      { pergunta: "1", history: [], range: [] },
      { pergunta: "2", history: [], range: [] },
    ],
    nameWork: "FATEC",
  });

  // Save the new chart model to the database
  const createChart = await Model.create(newModel);

  res.status(201).json({
    msg: "Chart creation successful",
  });
}
```

### Code - Updating a Chart

Use the following code snippet to update the chart based on customer feedback:

```javascript
// File: chartController.ts

import { Request, Response } from "express";
import { Model } from "../models/avaliable";
import { io } from "../server";

export async function Chart(req: Request, res: Response) {
  const { range, pergunta } = req.body;

  // Array of months for reference
  const meses = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
  ];

  const hoje = new Date();
  const dia = hoje.getDate().toString();
  const mes = meses[hoje.getMonth()];

  // Find the chart based on the specified question
  const item: any = await Model.findOne({ "company.pergunta": pergunta });
  const getFile = item?.company.findIndex((index: any) => index.pergunta == pergunta);

  const formatDate = `${dia} ${mes}`;

  // Check if the question is found
  if (!item) {
    return res.status(401).json({ msg: "Question not found" });
  }

  // Update the chart with the new feedback data
  const update = await Model.updateOne({ "company.pergunta": pergunta }, {
    $push: {
      [`company.${getFile}.history`]: formatDate,
      [`company.${getFile}.range`]: range,
    }
  });

  // Emit an event to inform the frontend about the chart update
  if (update) {
    io.emit("admin", await Model.findOne());
  }

  res.json({ msg: "Thank you for your feedback" });
}
```
```plaintext
├── models/
│   ├── avaliable.ts
│   └── ...   // Other models
├── routes/
│   ├── router.ts
│   └── ...   // Other routes
├── database/
│   └── mongoDB.ts
├── controllers/
│   ├── createChartController.ts
│   ├── chartController.ts
│   └── ...   // Other controllers
├── server.ts
└── ...
```

## How to Use - Frontend

Follow the instructions in the previous README section to install the required frontend dependencies and configure Socket.io. Additionally, refer to the provided [example](https://github.com/Igordevz/Front-assessment-company) for a complete implementation.

Feel free to adapt and enhance the documentation based on your project's specific needs.
