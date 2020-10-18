import React, { useEffect, useState } from "react";
import axios from "axios";
import ReserveModal from "./ReserveModal";
import EditModal from './EditModal'
import moment from "moment";

import {
  Segment,
  Grid,
  Header,
  Search,
  Table,
  Button,
  Icon,
} from "semantic-ui-react";
import _ from "lodash";

function BooksList() {
  const initialState = {
    loading: false,
    results: [],
    value: "",
  };

  const [state, setState] = useState({
    list: [],
    reservations: [],
    searchType: "author",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/books`).then((all) => {
      console.log(all.data);
      setState((prev) => ({
        ...prev,
        list: all.data,
      }));
    });

    axios.get(`http://localhost:3001/api/reserve`).then((all) => {
      console.log(all.data);
      setState((prev) => ({
        ...prev,
        reservations: all.data,
      }));
    });
  }, []);

  const cancelReservation = (id, book) => {
    console.log(book);
    const bookId = book.book_id;
    const quantity = book.quantity + 1;
    axios
      .delete(`http://localhost:3001/reserve/cancel/${id}`)
      .then((all) => {
        console.log(all.data);
        setState((prev) => ({
          ...prev,
          reservations: all.data,
        }));
      })
      .then(() => {
        return axios
          .put("http://localhost:3001/books", { bookId, quantity })
          .then((all) => {
            console.log(all.data);
            setState((prev) => ({
              ...prev,
              list: all.data,
            }));
            dispatch({ type: "CLEAN_QUERY" });
          });
      });
  };

  

  function reducer(searchState, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState;
      case "START_SEARCH":
        return { ...searchState, loading: true, value: action.query };
      case "FINISH_SEARCH":
        return { ...searchState, loading: false, results: action.results };
      case "UPDATE_SELECTION":
        return { ...searchState, value: action.selection };

      default:
        throw new Error();
    }
  }

  const [searchState, dispatch] = React.useReducer(reducer, initialState);
  const { loading, results, value } = searchState;

  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result) =>
          re.test(state.searchType === "title" ? result.title : result.author);
        dispatch({
          type: "FINISH_SEARCH",
          results: _.filter(state.list, isMatch),
        });
      }, 300);
    },
    [state]
  );
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const searchType = function (term) {
    if (term === "author") {
      setState((prev) => ({
        ...prev,
        searchType: "author",
      }));
    } else {
      setState((prev) => ({
        ...prev,
        searchType: "title",
      }));
    }
  };

  let bookList = [];

  if (results.length === 0) {
    bookList = state.list.map((book) => (
      <Table.Row>
        <Table.Cell>
          {book.quantity > 0 ? (
            <ReserveModal book={book} setState={setState} />
          ) : (
            <Button disabled color="grey">
              Reserve
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.author}</Table.Cell>
        <Table.Cell>{book.quantity}</Table.Cell>
        <Table.Cell>
          {book.quantity > 0 ? "Available" : "Out of stock!"}
        </Table.Cell>
      </Table.Row>
    ));
  } else {
    bookList = results.map((book) => (
      <Table.Row>
        <Table.Cell>
          {book.quantity > 0 ? (
            <ReserveModal book={book} setState={setState} />
          ) : (
            <Button disabled color="grey">
            Reserve
          </Button>
          )}
        </Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.author}</Table.Cell>
        <Table.Cell>{book.quantity}</Table.Cell>
        <Table.Cell>
          {book.quantity > 0 ? "Available" : "Out of stock!"}
        </Table.Cell>
      </Table.Row>
    ));
  }

  const reservationList = state.reservations.map((reservation) => (
    <Table.Row>
      <Table.Cell>
        {reservation.title}
        {reservation.book_id}
        {}
      </Table.Cell>
      <Table.Cell>{reservation.author}</Table.Cell>
      <Table.Cell>
        Pick up {moment(reservation.start_date, "YYYY-MM-DD").fromNow()} <br />{" "}
        {reservation.start_date}
      </Table.Cell>
      <Table.Cell>
        Return {moment(reservation.end_date, "YYYY-MM-DD").fromNow()} <br />{" "}
        {reservation.end_date}
      </Table.Cell>

      <Table.Cell>
        
        <EditModal reservation={reservation} setState={setState}/>
        </Table.Cell>
        <Table.Cell>
        <Button
          size='big'
          compact
          color="red"
          onClick={() => cancelReservation(reservation.reserve_id, reservation)}
        >
          Cancel
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Grid centered verticalAlign="top">
      <Grid.Row verticalAlign="top" centered style={{ position: "top" }}>
        <Grid.Column width={5} style={{ textAlign: "center" }}>
          <Segment padded="very" inverted>
            <Header size="huge" inverted style={{ fontSize: "4rem" }}>
              Our Library
            </Header>
            <Button.Group>
              <Button
                inverted
                color="instagram"
                size="huge"
                style={{ margin: "1rem" }}
                onClick={() => searchType("author")}
              >
                <Icon name="user" />
                Author
              </Button>
              <Button
                toggle
                inverted
                color="instagram"
                size="huge"
                style={{ margin: "1rem" }}
                onClick={() => searchType("title")}
              >
                <Icon name="book" />
                Title
              </Button>
            </Button.Group>

            <Search
            
              fluid
              size="huge"
              loading={loading}
              onResultSelect={(e, data) =>
                dispatch({
                  type: "UPDATE_SELECTION",
                  selection: data.result.title,
                })
              }
              onSearchChange={handleSearchChange}
              open={false}
              results={results}
              value={value}
              placeholder={`Search by ${state.searchType}`}
            />

            <Table compact celled definition size="large">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Author</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{bookList}</Table.Body>
            </Table>
          </Segment>
        </Grid.Column>

        {/* <Grid.Column width={2}></Grid.Column> */}
        <Grid.Column width={9} style={{ textAlign: "center" }}>
          <Segment padded="very" inverted>
            <Header size="huge" inverted style={{ fontSize: "4rem" }}>
              Your Reserved Books
            </Header>
            <Table size="large" celled fixed textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Author</Table.HeaderCell>
                  <Table.HeaderCell>Pick Up</Table.HeaderCell>
                  <Table.HeaderCell>Return By</Table.HeaderCell>
                  <Table.HeaderCell>Edit Dates</Table.HeaderCell>
                  <Table.HeaderCell>Cancel</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{reservationList}</Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default BooksList;
