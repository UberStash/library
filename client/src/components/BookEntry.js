import React from "react";
import ReserveModal from "./ReserveModal";
import {
  Table,
  Button,
} from "semantic-ui-react";

function BookEntry(props) {
  
  return (
    
    <Table.Row >
        <Table.Cell>
          {props.book.quantity > 0 ? (
            <ReserveModal book={props.book} setState={props.setState} />
          ) : (
            <Button disabled color="grey">
              Reserve
            </Button>
          )}
        </Table.Cell>
        <Table.Cell>{props.book.title}</Table.Cell>
        <Table.Cell>{props.book.author}</Table.Cell>
        <Table.Cell>{props.book.quantity}</Table.Cell>
        <Table.Cell>
          {props.book.quantity > 0 ? "Available" : "Out of stock!"}
        </Table.Cell>
      </Table.Row>
  )
    
  }



export default BookEntry;