Certainly! Here's an improved version of your README:

# Performance Evaluation System with [chart.js](https://www.chartjs.org/) Integration

This project serves as a valuable tool for assessing company performance in relation to customers, demonstrating significant potential for implementation in local businesses.

## How to Use - Frontend

### Install dependencies

Make sure to install the required dependencies using npm:

```bash
npm i react-chartjs-2
npm i socket.io-client
```

### Configure Socket in React/JavaScript

Import and configure Socket.io in your React application:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:8080/", {
  transports: ["websocket"],
});
```

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

## [Example](https://github.com/Igordevz/Front-assessment-company)

Explore the provided example in the [GitHub repository](https://github.com/Igordevz/Front-assessment-company) to see how the system is implemented.

Feel free to adjust and enhance the documentation as needed for your specific project requirements.
