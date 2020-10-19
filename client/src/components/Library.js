import React, { useState, useReducer, useRef, useCallback, useEffect } from "react";
import BookEntry from "./BookEntry";
import ReservedEntry from "./ReservedEntry";
import { reducer } from "../helpers/reducer";
import { GetInitialState } from "../hooks/serverEvents";
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

  const [searchState, dispatch] = useReducer(reducer, initialState);
  const { loading, results, value } = searchState;
  
  GetInitialState(setState);


  const timeoutRef = useRef();


  // handles the search through the state list
  const handleSearchChange = useCallback(
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

  // clears timeout used for search results
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

// changes search type based on button click 
  const searchType = (term) => {
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
// book list builder
  if (results.length === 0) {
    bookList = state.list.map((book) => (
      <BookEntry book={book} setState={setState} key={book.id}/>
    ));
  } else {
    bookList = results.map((book) => (
      <BookEntry book={book} setState={setState} key={book.id}/>
    ));
  }
// reservation builder
  const reservationList = state.reservations.map((reservation) => (
    <ReservedEntry
      reservation={reservation}
      setState={setState}
      dispatch={dispatch}
      key={reservation.reserve_id}
    />
  ));

  return (
    <Grid centered verticalAlign="top">
      <Grid.Row verticalAlign="top" centered style={{ position: "top" }}>
        <Grid.Column mobile={14} tablet={14} computer={6} widescreen={6} style={{ textAlign: "center" }}>
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
            noResultsDescription={'There was no results for your search please try again!'}
            style={{ marginBottom: '3rem'}}
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
              noResultsMessage={null}
              results={results}
              value={value}
              open={results.length === 0 && value.length > 0 ? true : false}
              placeholder={`Search by ${state.searchType}`}
            />

            <Table compact celled size="large">
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

        <Grid.Column mobile={14} tablet={14} computer={9} widescreen={9} style={{ textAlign: "center" }}>
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
