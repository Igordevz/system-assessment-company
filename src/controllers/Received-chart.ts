import { Request, Response } from "express";
import { Model } from "../models/avaliable";
import VerifyItems from "../utils/verifyItemDB";

export async function Chart(req: Request, res: Response) {
  const { range, pergunta } = req.body;


  const hoje = new Date();
  const dia = hoje.getDate().toString(); 
  // pegar perguntar
  const item:any = await Model.findOne({"company.pergunta": pergunta})
  const getFile = item?.company.findIndex((index:any) => index.pergunta == pergunta)

  const update = await Model.updateOne({"company.pergunta": pergunta}, {
    $push: {
      [`company.${getFile}.history`]: dia,
      [`company.${getFile}.range`]: range,

    }
  })

  res.json({msg: "Obrigado pelo seu feedback"})
}
