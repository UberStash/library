import axios from "axios";

export const handleReservationSubmit = (state, props) => {
  console.log(state);
  return axios
    .post("http://localhost:3001/reserve", { state })
    .then((res) => console.log("post", res))
    .then(() => {
      updateQuantity(state, props);
    });
};

export const updateQuantity = (state, props) => {
  const bookId = state.bookId;
  const quantity = state.quantity - 1;
  return axios
    .put("http://localhost:3001/books", { bookId, quantity })
    .then((res) => {
      props.setState((prev) => ({
        ...prev,
        list: res.data,
      }));
    })
    .then(() => updateReservations(props))
    .catch((err) => console.log(err));
};

export const updateReservations = (props) => {
  return axios
    .get("http://localhost:3001/api/reserve")
    .then((res) => {
      props.setState((prev) => ({
        ...prev,
        reservations: res.data,
      }));
    })
    .then(() => props.handleClose());
};

export const handleEditSubmit = (state, props) => {
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
