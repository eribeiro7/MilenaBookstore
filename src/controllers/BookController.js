const Book = require('../models/Book');

const requiredFieldsValidator = (keys, data) => {
    const errors = [];
    for (key of keys) {
        if (!data[key]) {
            errors.push({ error: `Campo ${key} obrigatorio` });
        }
    }
    return errors;
}
const isNotListEmpty = (list) => {
    return list && list.length > 0 ? true: false;
}
//console.log( CarroService.all() );
module.exports = {
    all: async (req, res) => {
        let json = { result: [] };
        let books = await Book.all();
        if(isNotListEmpty(books)){
            for (let i = 0; i < books.length; i++) {
                json.result.push({
                    id: books[i].ID,
                    name: books[i].TITTLE,
                    country_id: books[i].AUTHOR_ID,
                    country_id: books[i].USER_ID,
                    created_at: books[i].CREATED_AT,
                    updated_at: books[i].UPDATED_AT
                });
            }
            res.status(200).json(json);
        }else{
            res.status(404).json(json);
        }
    },

    find: async (req, res) => {
        let json = { result: {} };
        let id = req.params.id;
        let book = await Book.find(id);
        if (!book) {
            return res.status(404).json({ msg: 'Utilizador não encontrado.' });
        }
        json.result = book;
        res.status(200).json(json);
    },

    store: async (req, res) => {
        let json = { result: {} };
        const keys = ['tittle'];
        const errors = requiredFieldsValidator(keys, req.body);
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        const { tittle, author_id, isbn, created_at, updated_at, user_id } = req.body;
        const bookAlreadyExiste = await Book.findByIsbn(isbn);
        if(bookAlreadyExiste){
            const msg = "Livro "+ isbn + " já existe.";
            return res.status(404).json({msg});
        }
        let book = await Book.store(tittle, author_id, isbn, created_at, updated_at, user_id);
        json.result = {
            id: book,
            tittle,
            author_id,
            isbn,
            created_at,
            updated_at,
            user_id
        }
        return res.status(200).json(json);
    },

    update: async (req, res) => {
        let json = { result: {} };
        let id = req.params.id;
        let name = req.body.name;
        let updated_at = req.body.updated_at;
        const keys = ['tittle'];
        const errors = requiredFieldsValidator(keys, req.body);
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        const author = await Author.find(id);
        if(!author){
            return res.status(400).json({ msg: 'Utilizador não foi encontrado.' });
        }
        await Author.update(id, name, updated_at);
        json.result = {
                id,
                name,
                updated_at
            }
        res.status(200).json(json);
    },
    destroy: async (req, res) => {
        let json = { result: {} };
        const id = req.params.id;
        const author = await Author.find(id);
        if(!author){
            return res.status(400).json({ msg: 'Utilizador não foi encontrado.' });
        }
        await Author.destroy(id);
        res.status(200).json(json);
    },
    findByIsbn: async (req, res) => {
        let json = { result: {} };
        let isbn = req.body.isbn;
        let book = await Book.findByIsbn(isbn);
        if (book) {
            json.result = book;
        }
        res.json(json);
    }
};