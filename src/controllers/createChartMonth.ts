import { Request, Response } from "express";
import { Model } from "../models/avaliable";

export async function CreateChart(req: Request, res: Response) {
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const hoje = new Date();
  const mes = meses[hoje.getMonth()];

  // criar array dentro dos models, para armazenar todas as perguntas;
  const newmodel = new Model({
    company: [
      {
        pergunta: "1",
        history: [],
        range: [],
      },
      {
        pergunta: "2",
        history: [],
        range: [],
      },
    ],
    nameWork: "FATEC",
  });

  const createChart = await Model.create(newmodel);

  res.status(201).json({
    msg: "create chart, successful",
  });
}
