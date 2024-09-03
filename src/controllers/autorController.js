import { autor } from "../models/Autor.js"
import { livro } from "../models/Livro.js"

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
             res
               .status(500)
               .json({ message: `${erro.message} - falha na requisição` });
           }
    }

    static async cadastrarAutores (req, res) {
        const novoAutor = req.body;
        try {
            const autorEncontrado = await livro.findById(novoAutor.livro);
            const autorCompleto = {...novoAutor, livro: {...autorEncontrado._doc}}
            const autorCriado =  await autor.create(autorCompleto);
            res.status(201).json(
                {
                message: "criado com sucesso",
                livro: autorCriado
            });
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
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado"});
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
