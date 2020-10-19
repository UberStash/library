import React, { useState } from "react";
import "./App.scss";
import BooksList from "./components/Library";
import Landing from "./components/LandingPage";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setTimeout(function () {
      setOpen(true);
    }, 500);
  };

  return (
    <div className="App">
      <header className="App-header">
        {open ? <BooksList /> : <Landing handleOpen={handleOpen} />}
      </header>
    </div>
  );
}

export default App;
