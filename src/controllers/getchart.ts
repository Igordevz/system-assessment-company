import { Request, Response } from "express";
import { Model } from "../models/avaliable";
export async function GetChart(req: Request, res: Response) {

    const data = await Model.find();

    return res.json({data})
    
}