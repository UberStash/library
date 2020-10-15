import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react'
import ReserveForm from './ReserveForm';

function ReserveModal(props) {
  const [open, setOpen] = React.useState(false)
  
  const handClose = () => { 
    setOpen(false);
  }

  return (
    <div>
    <Modal 
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button inverted={true}>Reserve</Button>}
    >
      <Modal.Header>RESERVE</Modal.Header>
      <Modal.Content>
        <Modal.Description>
  <Header>Fill Out To Reserve {props.book.title}</Header>
            <ReserveForm handleClose={handClose} book={props.book.id}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default ReserveModal;