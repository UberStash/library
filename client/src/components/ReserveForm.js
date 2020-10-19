import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";
import moment from 'moment'
import {handleReservationSubmit} from './serverEvents'

const ReserveForm = (props) => {
  const [state, setState] = useState({
    start_date: "",
    end_date: "",
    bookId: props.book.id,
    quantity: props.book.quantity,
  });

  const handleChange = (e) => {
    const newFields = { ...state, [e.target.name]: e.target.value };
    setState(newFields);
  };

  
  return (
    <Form onSubmit={() => handleReservationSubmit(state, props)}>
      <Form.Group>
        <Form.Field required>
          <label htmlFor="start_date">
            Day You Want To Reserve The Book For
          </label>
          <input
            min={moment().format('YYYY-MM-DD')}
            type="date"
            name="start_date"
            value={state.start_date}
            onChange={handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="end_date">Day You Want To Return The Book By</label>
          <input
            min={state.start_date}
            type="date"
            name="end_date"
            value={state.end_date}
            onChange={handleChange}
          ></input>
        </Form.Field>
      </Form.Group>

      <Button>Reserve</Button>
    </Form>
  );
};

export default ReserveForm;
