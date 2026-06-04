const express= require('express')
const router= express.Router();

const {registarInquerito}= require("../controllers/inqueritoController");
router.post("/registarInquerito", registarInquerito);

module.exports= router;