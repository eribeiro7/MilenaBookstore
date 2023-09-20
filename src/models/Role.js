const knexFile = require('../../knexfile')['development'];
const knex = require('knex')(knexFile);

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            knex('roles').groupBy('name').then(data => {
                aceito(data);
                return;
            });
        });
    },
    show: (id) => {
        return new Promise((aceito, rejeitado) => {
            knex('roles').groupBy('name').where('id', id).then(data => {
                if(data.length > 0){
                    aceito(data[0]);
                }else{
                    aceito(false);
                }
            });
        });
    }
    
};