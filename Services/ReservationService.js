const pool = require('../database.js');


/*************** create Reservation ****************/
async function createReservation(
    DescriptionReservation,
    iduser,
    idparking,
    dateDebut,
    dateFin
    ){
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(
        'SELECT * FROM parkings WHERE parkingId = ?;',
        [idparking]
        );
        console.log(idparking);
        if (results.length == 0) {
            throw new Error("Parkign n existe pas");
        }
        const parking = results[0]; 
        if (parking.nombreDePlaces == parking.nombreDePlacesReserve) {
            throw new Error("Parking plein, pas de places disponibles.");
        }
        const [insertResult] = await connection.query(
            'INSERT INTO reservations (DescriptionReservation, numero, iduser, idparking, dateDebut, dateFin) VALUES (?, ?, ?, ?, ? , ?)',
            [DescriptionReservation,parking.nombreDePlacesReserve +1 , iduser, idparking, dateDebut , dateFin]
        );
        console.log("datedebut : " , dateDebut)
        const reservationId = insertResult.insertId;
        const [newReservation] = await connection.query(
            'SELECT * FROM reservations WHERE reservationId = ?',
            [reservationId]
        );
        const reservation = newReservation[0];
        const [updateParking] = await connection.query(
            'UPDATE parkings SET nombreDePlacesReserve = ? WHERE parkingId = ?',
            [parking.nombreDePlacesReserve + 1, parking.parkingId]
        );        
        return { reservation };
    } catch (e) {
        throw e;
    } finally {
        connection.release();
    }
}
 
/*************** Afficher all Reservations *************/
async function getAllReservations() {
    const connection = await pool.getConnection();
    try {
        const [reservations] = await connection.query('SELECT * FROM reservations');
        return reservations;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}

/*************** Afficher Reservations by id *************/
async function getReservationById(reservationId) {
    const connection = await pool.getConnection();
    try {
        const [reservation] = await connection.query('SELECT * FROM reservations WHERE reservationId = ?', [reservationId]);
        if (reservation.length === 0) {
            throw new Error('Reservation not found');
        }
        return reservation[0];
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
}
  
module.exports = {
    createReservation,  
    getAllReservations, 
    getReservationById
};