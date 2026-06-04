require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRoutes = require("./routes/apiRoutes");
const inqueritoRoute= require("./routes/InqueritoRoute");

const app = express();

// --- CONFIGURAÇÕES & MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Log das requisições no terminal

// --- ROTAS ---

// Rota de Teste de Saúde (Health Check)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Online",
    message: "Col-Down Project",
   
  });
});

// Agrupamento das rotas da API
app.use("/api", apiRoutes);

// --- INICIALIZAÇÃO DO SERVIDOR ---

// Garantimos que a porta é um número limpo para evitar erros de EACCES
const PORT = parseInt(process.env.PORT) || 3001;

app.listen(PORT, () => {
  console.log(`
    🚀 =========================================
    📡 SERVIDOR RODANDO COM SUCESSO
    🔗 URL: http://localhost:${PORT}
    🛠️  Modo: Desenvolvimento
    =========================================
    `);
});

// Tratamento básico de erros globais
app.use((err, req, res, next) => {
  console.error("❌ Erro não tratado:", err.stack);
  res.status(500).send("Algo correu mal no servidor!");
});
