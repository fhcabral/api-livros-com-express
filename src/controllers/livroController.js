import { autor } from "../models/Autor.js";
import { livro } from "../models/Livro.js"

class LivroController {

    static async listarLivros (req, res) {
        try {
             const listaLivros = await livro.find({}).populate("autor").exec();
             res.status(200).json(listaLivros);
           } catch (erro) {
             res
               .status(500)
               .json({ message: `${erro.message} - falha na requisição` });
           }
    }

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            if(livroEncontrado) {
                res.status(200).json(livroEncontrado);
            } else {
                res.status(404).json(
                    {
                    message: `Livro não existe com este ${id} não existe`,    
                })
            } 
           } catch (erro) {
             res
               .status(500)
               .json({ message: `${erro.message} - falha na requisição` });
           }
    }

    static async cadastrarLivros (req, res) {
        // const novoLivro = req.body;
        try {
        //     const autorEncontrado = await autor.findById(novoLivro.autor);
        //     const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
            const novoLivro = await livro.create(req.body);
            res.status(201).json(
                {
                message: "criado com sucesso",
                livro: novoLivro
            });
        } catch (erro) {
            res.status(500).json(
                {
                    message: `${erro.message} - falha ao cadastrar livro`
                });
        }
    }

    static async alterarLivros (req, res) {
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

    static async deletarLivros (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro deletado com sucesso"});
           } catch (erro) {
             res
               .status(500)
               .json({ message: `${erro.message} - falha ao deletar` });
           }
    }

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch(erro){

        }
    }

}

export default LivroController;
