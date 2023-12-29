import { Router } from "express";
import { CreateChart } from "../controllers/createChartMonth";
import { Chart } from "../controllers/Received-chart";
import { GetChart } from "../controllers/getchart";

export const router = Router();

router.get("/", (req, res) => {
    res.send("hello word")
})

router.get("/create", CreateChart)
router.post("/chart", Chart)
router.get("/get",GetChart)