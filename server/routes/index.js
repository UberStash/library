var express = require("express");
var router = express.Router();
const db = require("../db");

const getBooks = () => {
  const query = {
    text: `SELECT * FROM books`,
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

// Create a reservation
router.post("/reserve", (req, res) => {
  console.log(req.body.state.start_date)
  addReservation(req.body.state)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => res.json({ err }));
});

module.exports = router;
