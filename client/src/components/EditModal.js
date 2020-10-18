import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import EditForm from "./EditForm";

function ReserveModal(props) {
  const [open, setOpen] = React.useState(false);

  const handClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={
          <Button size="big" compact color="yellow">
            Edit
          </Button>
        }
      >
        <Modal.Header>Edit</Modal.Header>
        <Modal.Content>
          <Header>{props.reservation.title}</Header>
          <Modal.Description>
            <EditForm
              handleClose={handClose}
              reservation={props.reservation}
              setState={props.setState}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default ReserveModal;
