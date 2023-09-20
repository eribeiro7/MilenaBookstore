const Role = require('../models/Role');

const isNotListEmpty = (list) => {
    return list && list.length > 0 ? true: false;
}
module.exports = {
    all: async (req, res) => {
        let json = {result: []};
        let roles = await Role.all();
        console.log(roles);
        if(isNotListEmpty(roles)){
            for (let i = 0; i < roles.length; i++) {
                json.result.push({
                    id: roles[i].ID,
                    name: roles[i].NAME,
                    description: roles[i].DESCRIPTION
                });
            }
            res.status(200).json(json);
        }else{
            res.status(404).json(json);
        }
    },
    show: async (req, res) => {
        let json = { result: {} };
        let id = req.params.id;
        let role = await Role.show(id);
        if (!role) {
            return res.status(404).json({ msg: 'Utilizador não encontrado.' });
        }
        json.result = role;
        res.status(200).json(json);
    }
};