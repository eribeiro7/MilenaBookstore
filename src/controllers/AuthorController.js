const Author = require('../models/Author');

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
        let author = await Author.all();
        if(isNotListEmpty(author)){
            for (let i = 0; i < author.length; i++) {
                json.result.push({
                    id: author[i].ID,
                    name: author[i].NAME,
                    country_id: author[i].COUNTRY_ID,
                    created_at: author[i].CREATED_AT,
                    updated_at: author[i].UPDATED_AT
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
        let author = await Author.find(id);
        if (!author) {
            return res.status(404).json({ msg: 'Utilizador não encontrado.' });
        }
        json.result = author;
        res.status(200).json(json);
    },

    store: async (req, res) => {
        let json = { result: {} };
        const keys = ['name'];
        const errors = requiredFieldsValidator(keys, req.body);
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        const { name, country_id, created_at, updated_at } = req.body;
        let author = await Author.store(name, country_id, created_at, updated_at);
        json.result = {
            id: author,
            name,
            country_id,
            created_at,
            updated_at
        }
        return res.status(200).json(json);
    },

    update: async (req, res) => {
        let json = { result: {} };
        let id = req.params.id;
        let name = req.body.name;
        let updated_at = req.body.updated_at;
        const keys = ['name'];
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
    findByAuthorname: async (req, res) => {
        let json = { result: {} };
        let name = req.body.name;
        let author = await Author.findByAuthorname(name);
        if (author) {
            json.result = author;
        }
        res.json(json);
    }
};