# Performance evaluation system in results compatible with the [chart.js](https://www.chartjs.org/) lib

### This project is effective and important to know the company's production in relation to customers, the project started with a great potential for action in local companies;


# How to use -- Front

### install socket.io and react-chartjs-2

```bash
  npm i react-chartjs-2
  npm i socket.io-client
```

### Config Socket - react/javascript

```javascript
    import { io } from "socket.io-client";
    
    const socket = io("http://localhost:8080/", {
      transports: ["websocket"],
    });
```

### endpoints 

```bash 
  / -- test API
  /create -- create a database to store feedback data
  /chart  -- take customer feedback and turn it into data
  /get -- search for data to transform it into a chart
```
### Request for data storage

```json
    {
  	"range": 4,
  	"pergunta": "1"
  }
```

resposta

```json
{
	"msg": "Obrigado pelo seu feedback"
}
```

# [Example](https://github.com/Igordevz/Front-assessment-company) 


