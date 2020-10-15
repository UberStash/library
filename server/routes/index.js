var express = require('express');
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


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/api/books", (req, res) => {
  getBooks(req.params.id)
    .then((data) => {
      console.log("appts: ", data.data);
      return res.json(data);
    })
    .catch((err) => res.json({ err }));
});

module.exports = router;
