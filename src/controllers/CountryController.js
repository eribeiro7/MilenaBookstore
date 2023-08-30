const Country = require('../models/Country');

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
        let countries = await Country.all();
        if(isNotListEmpty(countries)){
            for (let i = 0; i < countries.length; i++) {
                json.result.push({
                    id: countries[i].ID,
                    name: countries[i].NAME,
                    created_at: countries[i].CREATED_AT,
                    updated_at: countries[i].UPDATED_AT
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
        let country = await Country.find(id);
        if (!country) {
            return res.status(404).json({ msg: 'Utilizador não encontrado.' });
        }
        json.result = country;
        res.status(200).json(json);
    },

    store: async (req, res) => {
        let json = { result: {} };
        const keys = ['name'];
        const errors = requiredFieldsValidator(keys, req.body);
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        const { name, created_at, updated_at } = req.body;
        let country = await Country.store(name, created_at, updated_at);
        json.result = {
            id: country,
            name,
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
        const country = await Country.find(id);
        if(!country){
            return res.status(400).json({ msg: 'Utilizador não foi encontrado.' });
        }
        await Country.update(id, name, updated_at);
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
        const country = await Country.find(id);
        if(!country){
            return res.status(400).json({ msg: 'Utilizador não foi encontrado.' });
        }
        await Country.destroy(id);
        res.status(200).json(json);
    },
    findByCountryname: async (req, res) => {
        let json = { result: {} };
        let Countryname = req.body.Countryname;
        let Country = await Country.findByCountryname(Countryname);
        if (Country) {
            json.result = Country;
        }
        res.json(json);
    }
};