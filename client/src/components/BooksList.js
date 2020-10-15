import React, { useEffect, useState } from "react";
import axios from "axios";
import ReserveModal from './ReserveModal'

import { Segment, Grid, Header, Search, Form, Checkbox, Table } from "semantic-ui-react";
import _ from 'lodash'

function BooksList() {
  const initialState = {
    loading: false,
    results: [],
    value: '',  
  }
  
  const [state, setState] = useState({
    list: [],
    searchType: 'author'
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/books`).then((all) => {
      console.log(all.data);
      setState((prev) => ({
        ...prev,
        list: all.data,
      }));
    });
  }, []);


 

function exampleReducer(searchState, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...searchState, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...searchState, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...searchState, value: action.selection }

    default:
      throw new Error()
  }
}



const [searchState, dispatch] = React.useReducer(exampleReducer, initialState)
const { loading, results, value } = searchState

const timeoutRef = React.useRef()

const handleSearchChange = React.useCallback((e, data) => {
  clearTimeout(timeoutRef.current)
  dispatch({ type: 'START_SEARCH', query: data.value })

  timeoutRef.current = setTimeout(() => {
    if (data.value.length === 0) {
      dispatch({ type: 'CLEAN_QUERY' })
      return
    }

    const re = new RegExp(_.escapeRegExp(data.value), 'i')
    const isMatch = (result) => re.test( state.searchType === 'title' ? result.title : result.author)
    dispatch({
      type: 'FINISH_SEARCH',
      results: _.filter(state.list, isMatch),
    })
    console.log(results)
  }, 300)
}, [state])
React.useEffect(() => {
  return () => {
    clearTimeout(timeoutRef.current)
  }
}, [])

const searchType = function(term) {
  if (term === "author") {
  setState((prev) => ({
    ...prev,
    searchType: 'author',
  }))
} else {

}
}

let bookList = []
{/* <Segment size='huge'>,   <ReserveModal book={book} /></Segment> */}

if(results.length === 0) {
  bookList = state.list.map((book) =>   
        <Table.Row>
        <Table.Cell collapsing>
        <ReserveModal book={book} />
        </Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.author}</Table.Cell>
        <Table.Cell>{book.quantity}</Table.Cell>
      </Table.Row>
);

} else {
  bookList = results.map((book) => <Segment size='huge'>{book.title}, {book.author}, {book.quantity} <ReserveModal book={book} /></Segment>);
}

  return (
    <Grid centered>
      <Grid.Row centered>
    <Grid.Column width={6}>
      <Segment>
      <Form>
        <Form.Group>
        <Form.Field >
          <Checkbox
            radio
            label='Author'
            name='checkboxRadioGroup'
            value='author'
            checked={true}
            onChange={() => searchType('author')}
            
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Title'
            name='checkboxRadioGroup'
            value='that'
            // checked={setState((prev) => ({
            //   ...prev,
            //   searchType: 'title',
            // }))}
            onChange={() => searchType('author')}
          />
        </Form.Field>
        </Form.Group>
      </Form>
      </Segment>
      <Search
      size='mini'
        loading={loading}
        onResultSelect={(e, data) =>
          dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
        }
        onSearchChange={handleSearchChange}
        results={results}
        value={value}
      />
    </Grid.Column>
    <Grid.Column width={2}>

    </Grid.Column>
    <Grid.Column width={6}>
    <Segment inverted>
    <Table compact celled definition>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Author</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {bookList}
      </Table.Body>
  </Table>
         
        </Segment>
        </Grid.Column>
        </Grid.Row>
  </Grid>
  );
}

export default BooksList;