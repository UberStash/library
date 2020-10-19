import { useEffect } from "react";
import axios from "axios";

export const handleReservationSubmit = (state, props) => {
  return axios
    .post("http://localhost:3001/reserve", { state })
    .then(() => {
      updateQuantity(state, props);
    })
    .catch((err) => window.alert("There was an error try again!"));
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
    .catch((err) => window.alert("There was an error try again!"));
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
    .then(() => props.handleClose())
    .catch((err) => window.alert("There was an error try again!"));
};

export const handleEditSubmit = (state, props) => {
  return axios
    .put(`http://localhost:3001/reserve`, { state })
    .then((res) => {
      props.setState((prev) => ({
        ...prev,
        reservations: res.data,
      }));
    })
    .then(() => props.handleClose())
    .catch((err) => window.alert("There was an error try again!"));
};

export const GetInitialState = (setState) => {
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/books`)
      .then((all) => {
        setState((prev) => ({
          ...prev,
          list: all.data,
        }));
      })
      .catch((err) => window.alert("There was an error try again!"));

    axios
      .get(`http://localhost:3001/api/reserve`)
      .then((all) => {
        setState((prev) => ({
          ...prev,
          reservations: all.data,
        }));
      })
      .catch((err) => window.alert("There was an error try again!"));
  }, [setState]);
};

export const cancelReservation = (id, book, setState, dispatch) => {
  const bookId = book.book_id;
  const quantity = book.quantity + 1;
  axios
    .delete(`http://localhost:3001/reserve/cancel/${id}`)
    .then((all) => {
      setState((prev) => ({
        ...prev,
        reservations: all.data,
      }));
    })
    .catch((err) =>
      window.alert("There was an error try again!", JSON.stringify(err))
    )
    .then(() => {
      return axios
        .put("http://localhost:3001/books", { bookId, quantity })
        .then((all) => {
          setState((prev) => ({
            ...prev,
            list: all.data,
          }));
          dispatch({ type: "CLEAN_QUERY" });
        })
        .catch((err) =>
          window.alert("There was an error try again!", JSON.stringify(err))
        );
    });
};
