const express = require("express");
const router = express.Router();
const { processarTriagem } = require("../controllers/triagemControllers");
// Rota para o Front-end enviar os dados do formulário
router.post("/registar-caso", processarTriagem);

module.exports = router;
