// src/controllers/triagemController.js
const { analisarCasoComIA } = require("../services/geminiService");

const processarTriagem = async (req, res) => {
  try {
    const { nome, idade, sintomas, localizacao, estado_geral } = req.body;

    // Cálculo de Risco Matemático (Rápido/Offline-ready)
    let scoreBase = 0;
    if (sintomas.includes("diarreia_aquosa")) scoreBase += 5;
    if (sintomas.includes("vomitos")) scoreBase += 3;
    if (estado_geral === "letargico") scoreBase += 2;

    // Chamar a Inteligência Artificial para análise profunda
    // Passamos apenas os dados clínicos para o Gemini
    const analiseIA = await analisarCasoComIA({ sintomas, estado_geral });

    // Preparar o objeto final para o Supabase
    const novoCaso = {
      paciente: nome,
      idade,
      localizacao, // { lat: x, lng: y }
      score_final: (scoreBase + analiseIA.nivel_risco) / 2,
      classificacao_ia: analiseIA.classificacao,
      recomendacao: analiseIA.recomendacao,
      data_registo: new Date(),
    };

    // Aqui chamarias o serviço do Supabase para guardar
    // const { data, error } = await supabase.from('casos').insert([novoCaso]);

    res.status(201).json({
      message: "Triagem concluída com sucesso",
      dados: novoCaso,
    });
  } catch (error) {
    console.error("Erro no processamento da triagem:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

module.exports = { processarTriagem };
