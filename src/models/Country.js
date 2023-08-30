const db = require('../../db');

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM countries', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    find: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM countries WHERE ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },
    store: (name, created_at, updated_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO countries (NAME, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?)', [name, created_at, updated_at], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.store);
            });
        });
    },
    update: (id, name, updated_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE countries SET NAME = ?, UPDATED_AT = ? WHERE ID = ?', [name, updated_at, id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.update);
            });
        });
    },
    destroy: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM countries where ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    findByName: (name) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM countries WHERE NAME = ?', [name], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    }
};