import React, { useEffect, useState } from "react";
import axios from "axios";
import ReserveModal from './ReserveModal'

function BooksList() {
  const [state, setState] = useState({
    list: [],
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/books`).then((all) => {
      console.log(all.data);
      setState((prev) => ({
        ...prev,
        list: all.data,
      }));
    });
  }, []);

  const reserve = function(book) {
    console.log('You clkicked', book)
  }

const bookList = state.list.map((book) => <div>{book.title}, {book.author}, {book.quantity} <ReserveModal book={book} /></div>);

  return (
    
        <> {bookList}</>
  
  );
}

export default BooksList;