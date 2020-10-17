var express = require("express");
var router = express.Router();
const db = require("../db");

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
  console.log(end_date)
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

const cancelReservation = ( id ) => {
  console.log('in', id)
  const query = {
    text: `DELETE FROM reservations WHERE reserve_id = ${id};      
    `
    
  };

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((err) => console.log(err));
};


const removeFromQuantity = (quantity, id) => {
  console.log('function',quantity, id)
  const query = {
    text: `UPDATE books SET quantity = ${quantity} WHERE id = ${id};`       
    
  };

  return db
    .query(query)
    .then((result) => {result.rows})
    .catch((err) => err);
};



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// get the list of all books
router.get("/api/books", (req, res) => {
  getBooks(req.params.id)
    .then((data) => {
      console.log("appts: ", data.data);
      return res.json(data);
    })
    .catch((err) => res.json({ err }));
});

router.get("/api/reserve", (req, res) => {
  getReservations(req.params.id)
    .then((data) => {
      console.log("appts: ", data.data);
      return res.json(data);
    })
    .catch((err) => res.json({ err }));
});

// Create a reservation
router.post("/reserve", (req, res) => {
  console.log(req.body.state.start_date)
  const quantity = req.body.state.quantity - 1
  addReservation(req.body.state)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => res.json({ err }));
});

router.delete("/reserve/cancel/:id", (req, res) => {

  cancelReservation(req.params.id)
  getReservations()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => res.json({ err }));
});

router.put("/books", (req, res) => {
console.log(req.body)
  removeFromQuantity(req.body.quantity, req.body.bookId)
    .then(getBooks().then(

      (data) => {
        return res.json(data);
      }
    )
      )
    .catch((err) => res.json({ err }));
});


module.exports = router;
