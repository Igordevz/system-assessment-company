import { Request, Response } from "express";
import { Model } from "../models/avaliable";

export default async function VerifyItems(req:Request, res:Response){
  const { range, pergunta } = req.body;


  const hoje = new Date();
  const mesAtual = hoje.toLocaleString('default', { month: 'long' });

  if (range == "" || range == null) {
    return res.json({ msg: "error, informe a sua avaliação" });
  }

  const LocalizeChart:any = await Model.findOne({"company.pergunta": pergunta});

  if (!LocalizeChart) {
    return res.status(404).json({ msg: "Pergunta não encontrada" });
  }

  const posicaoPergunta = LocalizeChart.company.findIndex((item: any) => item.pergunta === pergunta);
  const posicaoMonthHistory = LocalizeChart.company[posicaoPergunta]?.history.findIndex((item: any) => item.month === mesAtual);
  const posicaoMonthRange = LocalizeChart.company[posicaoPergunta]?.range.findIndex((item: any) => item.month === mesAtual);

  // criar caso não haja o mes
  if (posicaoPergunta !== -1) {
    if (posicaoMonthHistory === -1 && posicaoMonthRange === -1) {
      // Mês atual não encontrado no histórico, então cria um novo
      const novoHistorico = {
        month: mesAtual,
        days: [] // Adicione os dias conforme necessário
      };
      const novoRange = {
        month: mesAtual,
        avaliation: [] // Adicione as avaliações conforme necessário
      };

      await Model.updateOne(
        {"company.pergunta": pergunta},
        {
          $push: {
            [`company.${posicaoPergunta}.history`]: novoHistorico,
            [`company.${posicaoPergunta}.range`]: novoRange
          }
        }
      );
    }
  } else {
    res.status(404).json({ msg: "Pergunta não encontrada" });
  }
}