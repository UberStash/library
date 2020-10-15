import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
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

const bookList = state.list.map((book) => <div>{book.title}, {book.author}, {book.quantity} <button onClick={() => reserve(book)}>Reserve Me!</button></div>);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To Your Digital Library</h1>
        <> {bookList}</>
      </header>
    </div>
  );
}

export default App;
