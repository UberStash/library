import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    return axios
      .post("http://localhost:3001/reserve", { state })
      .then((res) => console.log('post', res))
      .then(() => {updateQuantity()
        
      });
  };
  const updateQuantity = () => {
    return axios
    .put("http://localhost:3001/books", { state })
    .then((res) => {
      props.setState((prev) => ({
        ...prev,
        list: res.data,
      }));
    })
    .then(() => updateReservations())
    .catch((err) => console.log(err));
  }

  const updateReservations = () => {
    return axios
    .get("http://localhost:3001/api/reserve")
    .then((res) => {
      props.setState((prev) => ({
        ...prev,
        reservations: res.data,
      }));
    })
    .then(() => props.handleClose())
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Field required>
          <label htmlFor="start_date">
            Day You Want To Reserve The Book For
          </label>
          <input
            type="date"
            name="start_date"
            value={state.start_date}
            onChange={handleChange}
          ></input>
        </Form.Field>

        <Form.Field required>
          <label htmlFor="end_date">Day You Want To Return The Book By</label>
          <input
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
