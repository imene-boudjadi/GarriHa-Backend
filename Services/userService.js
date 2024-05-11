const pool = require('../database.js');

/*************** Login ****************/
async function login(
    email,
    motDePasse
    ){
    const connection = await pool.getConnection();
    try {
    
        const [results] = await connection.query(
        'SELECT * FROM users WHERE email = ?;',
        [email]
        );
        console.log(email);
        if (results.length == 0) {
            throw new Error("Adresse mail incorrect");
        }
        const user = results[0];
        console.log(user.motDePasse)
        // Verification du mot de passe
        if (user.motDePasse != motDePasse) {
            throw new Error("Mot de passe incorrect");
        }
        // else retourner le user connecte
        return { user };
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}

/*************** SignUp ****************/
async function signup(
    firstName,
    lastName,
    email,
    NUmeroTel,
    motDePasse,
    PhotoUser
    ){
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(
        'SELECT * FROM users WHERE email = ?;',
        [email]
        );
        console.log(email);
        if (results.length != 0) {
            throw new Error("Adresse mail deja utilise");
        }
        const [insertResult] = await connection.query(
            'INSERT INTO users (firstName, lastName, email, NUmeroTel, motDePasse, PhotoUser) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, NUmeroTel, motDePasse, PhotoUser]
        );
        const userId = insertResult.insertId;
        const [newUser] = await connection.query(
            'SELECT * FROM users WHERE userId = ?',
            [userId]
        );
        user = newUser[0];
        // return user 
        return { user };
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}
 
 
module.exports = {
    login,   
    signup,    
};