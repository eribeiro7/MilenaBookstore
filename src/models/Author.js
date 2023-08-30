const db = require('../../db');

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM authors', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    find: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM authors WHERE ID = ?', [id], (error, results)=>{
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
    store: (name, country_id, created_at, updated_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO authors (NAME, COUNTRY_ID, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?)', [name, country_id, created_at, updated_at], (error, results)=>{
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
            db.query('UPDATE authors SET NAME = ?, UPDATED_AT = ? WHERE ID = ?', [name, updated_at, id], (error, results)=>{
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
            db.query('DELETE FROM authors where ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    findByName: (name) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM authors WHERE NAME = ?', [name], (error, results)=>{
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