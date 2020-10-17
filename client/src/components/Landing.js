import React from "react";
import {
  Segment,
  Header,
  Button,
  Transition
} from "semantic-ui-react";

function Landing(props) {
  let [open, setOpen] = React.useState(true)

  const toggleVisibility = () => {
    setOpen( open = false )
    setTimeout(
      function() {
        props.handleOpen()
      }
      ,
      600
  );
    
  }

  return (
    
    <Transition visible={open} animation='scale' duration={500}>
    <Segment size='massive' inverted style={{border: '10px solid white', boxShadow: '4px 6px gray'}}>
        
    <Header size='huge' style={{fontSize: "4rem"}}>Welcome to our library</Header>
    <Button color='instagram' size='massive' onClick={() => toggleVisibility()}>Click me to enter</Button>
    </Segment>
    </Transition>
  )
}

export default Landing;