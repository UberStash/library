import React from "react";
import "./App.scss";
import BooksList from './components/BooksList'
import Landing from './components/Landing'
function App() {

  const [open, setOpen] = React.useState(false)
  
  const handleOpen = () => { 
    setOpen(true);
    
  }

  

  return (
    <div className="App">
      <header className="App-header">
        {open ? <BooksList/> : <Landing handleOpen={handleOpen}/>} 
      </header>
    </div>
  );
}

export default App;
