const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analisarCasoComIA = async (dadosPaciente) => {
  try {
    // Tenta usar a versão específica estável
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `
      Analise estes sintomas de suspeita de cólera em Moçambique:
      Sintomas: ${dadosPaciente.sintomas.join(", ")}
      Estado Geral: ${dadosPaciente.estado_geral}
      
      Responda APENAS um objeto JSON válido:
      {
        "nivel_risco": 1-10,
        "classificacao": "Grave/Provável/Suspeito",
        "recomendacao": "instrução curta"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log("🤖 Resposta Bruta da IA:", text);

    // --- A MÁGICA DA LIMPEZA ---
    // Esta linha remove ```json, aspas extras ou texto fora das chavetas
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const cleanJson = jsonMatch[0];
      return JSON.parse(cleanJson);
    } else {
      throw new Error("Formato JSON não encontrado na resposta");
    }
  } catch (error) {
    console.error("❌ Erro na IA:", error.message);
    return {
      nivel_risco: 7, // Score alto por segurança
      classificacao: "Grave (Manual)",
      recomendacao:
        "IA falhou. Iniciar protocolo de hidratação imediata (SRO) e isolamento.",
    };
  }
};

module.exports = { analisarCasoComIA };
