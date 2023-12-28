import express  from "express";
import { router } from "./routes/router";

function BootStrap() {
    
    const app = express();
    app.use(express.json())

    app.use(router)

    // configuration door
    const door = 8080
    app.listen(door, function(){
        console.log(door)
    })

}

BootStrap();