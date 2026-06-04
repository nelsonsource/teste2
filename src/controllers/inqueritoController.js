//const {supabase}=require("../config/supabase");

// REGISTAR NOVO INQUERITO
async function registarInquerito(req,res) {
    console.log("A registar inquerito epidemiologico flash...");
    console.log("Dados recebidos: ", req.body);

    try{

        const {
            id_caso,
            fonte_contagio,
            data_exposicao,
            locais_frequentados,
            acesso_agua,
            tratamento_agua,
            saneamento_basico,
            observacao,
            data_registo
            
        } = req.body;


        /*FALTA A VALIDACAO DO ID DO CASO EM QUESTAO
            .
            .
            .
        */


        // A CRIAR O OBJECTO DO NOVO INQUERITO
        const novoInquerito ={
            id: Date.now(),
            id_caso: parseInt(id_caso),
            fonte_contagio: fonte_contagio,
            data_exposicao: data_exposicao,
            locais_frequentados: locais_frequentados,
            acesso_agua: acesso_agua,
            tratamento_agua: tratamento_agua,
            saneamento_basico: saneamento_basico,
            observacao: observacao,
            data_registo: data_registo
            
        }

        // SALVANDO O NOVO INQUERITO NA BASE DE DADOS
        /*const {data: inqueritoSalvo, error: insertError} = await supabase
            .from("inqueritos")
            .insert([novoInquerito])
            .select()
            .single();*/



    }catch (error){
        console.error("Erro ao registar inquerito",error);
        res.status(500).json({
            sucess: false,
            erro: error.message
        });
        }
    }
module.exports= registarInquerito;