import { Request, Response } from "express";
import { Model } from "../models/avaliable";
import VerifyItems from "../utils/verifyItemDB";
import { io } from "../server";

export async function Chart(req: Request, res: Response) {
  const { range, pergunta } = req.body;
 
  const meses = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez"
  ];
  

  const hoje = new Date();
  const dia = hoje.getDate().toString(); 
  const mes = meses[hoje.getMonth()];
  // pegar perguntar
  const item:any = await Model.findOne({"company.pergunta": pergunta})
  const getFile = item?.company.findIndex((index:any) => index.pergunta == pergunta)

  const formatDate = `${dia} ${mes}`
  if(!item){
    return res.status(401).json({msg: "pergunta não encontrada"})
  }
  const update = await Model.updateOne({"company.pergunta": pergunta}, {
    $push: {  
      [`company.${getFile}.history`]: formatDate,
      [`company.${getFile}.range`]: range,
    }
  })
  if(update){
    io.emit("admin", await Model.findOne())
  }

  res.json({msg: "Obrigado pelo seu feedback"})
}
