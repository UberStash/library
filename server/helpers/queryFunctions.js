
module.exports = (db) => {
const getBooks = () => {
  const query = {
    text: `SELECT * FROM books
    ORDER BY title`,
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const getReservations = () => {
  const query = {
    text: `SELECT * FROM reservations
    JOIN books ON books.id = book_id 
    ORDER BY start_date`,
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const addReservation = ({ start_date, end_date, bookId }) => {
  console.log(end_date);
  const query = {
    text: `INSERT INTO reservations (start_date, end_date, book_id)       
    VALUES ($1, $2, $3)`,
    values: [start_date, end_date, bookId],
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => err);
};

const cancelReservation = (id) => {
  console.log("in", id);
  const query = {
    text: `DELETE FROM reservations WHERE reserve_id = ${id};      
    `,
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => console.log(err));
};

const removeFromQuantity = (quantity, id) => {
  console.log("function", quantity, id);
  const query = {
    text: `UPDATE books SET quantity = ${quantity} WHERE id = ${id};`,
  };

  return db
    .query(query)
    .then((result) => {
      result.rows;
    })
    .catch((err) => err);
};

const editReservation = ({ start_date, end_date, reserve_id }) => {
 
 console.log(start_date, end_date, reserve_id) 
 const query = {
    text: `UPDATE reservations SET 
    start_date = '${start_date}', 
    end_date = '${end_date}'
    WHERE reserve_id = ${reserve_id};      
    `
  };

  return db
    .query(query)
    .then((result) => {
      result.rows;
    })
    .catch((err) => err);
};

return {
  editReservation, removeFromQuantity, cancelReservation, addReservation, getReservations, getBooks
};
};