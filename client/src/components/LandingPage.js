import React, {useState} from "react";
import {
  Segment,
  Header,
  Button,
  Transition
} from "semantic-ui-react";

function Landing(props) {
  const [open, setOpen] = useState(true)

  const toggleVisibility = () => {
    setOpen(false)
    props.handleOpen()
  }

  return (
    
    <Transition visible={open} animation='scale' duration={500}>
    <Segment size='massive' inverted style={{border: '10px solid white', boxShadow: '2px 3px darkgray'}}>
        
    <Header size='huge' style={{fontSize: "4rem"}}>Welcome to our library</Header>
    <Button color='instagram' size='massive' onClick={() => toggleVisibility()}>Click me to enter</Button>
    </Segment>
   </Transition>
  )
}

export default Landing;