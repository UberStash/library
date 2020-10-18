
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";
import moment from 'moment'

const ReserveForm = (props) => {
  const [state, setState] = useState({
    start_date: props.reservation.start_date,
    end_date: props.reservation.end_date,
    reserve_id: props.reservation.reserve_id,
    
  });

  const handleChange = (e) => {
    const newFields = { ...state, [e.target.name]: e.target.value };
    setState(newFields);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    return axios
    .put(`http://localhost:3001/reserve`, { state })
    .then((res) => {
      
      console.log(res.data);
        props.setState((prev) => ({
          ...prev,
          reservations: res.data,
        }));
      })
      .then(() => props.handleClose())
  };
  


  return (
    <Form onSubmit={handleSubmit}>
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
