import autor from "../models/Autor.js";
import mongoose from "mongoose";

class AutorController {

    static async listarAutores (req, res) {
        try {
             const listaAutores = await autor.find({});
             res.status(200).json(listaAutores);
           } catch (erro) {
             res
               .status(500)
               .json({ message: `${erro.message} - falha na requisição` });
           }
    }

    static async listarAutoresPorId (req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            if(autorEncontrado) {
                res.status(200).json(autorEncontrado);
            } else {
                res.status(404).json(
                    {
                    message: `Autor não existe com este ${id} não existe`,    
                })
            } 
           } catch (erro) {
            if(erro instanceof mongoose.Error.CastError) {
                res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos."})
            }
             res
               .status(500)
               .json({ message: `${erro.message} - Erro interno de servidor` });
           }
    }

    static async cadastrarAutores (req, res) {
        try {
            let autores = new autor(req.body);
            const autorResultado = await autores.save();
             res.status(201).send(autorResultado.toJSON());
        } catch (erro) {
            res.status(500).json(
                {
                    message: `${erro.message} - falha ao cadastrar livro`
                });
        }
    }

    static async alterarAutores (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Autor atualizado com sucesso"});
           } catch (erro) {
             res
               .status(500)
               .json({ message: `${erro.message} - falha na atualização` });
           }
    }

    static async deletarAutores (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "autor deletado com sucesso"});
           } catch (erro) {
             res
               .status(500)
               .json({ message: `${erro.message} - falha ao deletar` });
           }
    }

}

export default AutorController;
