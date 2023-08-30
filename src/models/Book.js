const db = require('../../db');

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM books', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    find: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM books WHERE ID = ?', [id], (error, results)=>{
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
    store: (tittle, author_id, isbn, created_at, updated_at, user_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO books (TITTLE, AUTHOR_ID, ISBN, CREATED_AT, UPDATED_AT, USER_ID) VALUES (?, ?, ?, ?, ?, ?)', [tittle, author_id, isbn, created_at, updated_at, user_id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.store);
            });
        });
    },
    update: (id, tittle, author_id, isbn, updated_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE books SET TITTLE = ?, AUTHOR_ID = ?, ISBN = ?, UPDATED_AT = ? WHERE ID = ?', [tittle, author_id, isbn, updated_at, id], (error, results)=>{
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
            db.query('DELETE FROM books where ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    findByIsbn: (isbn) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM books WHERE ISBN = ?', [isbn], (error, results)=>{
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