import React from "react";
import moment from "moment";
import EditModal from "./EditModal";
import {cancelReservation} from '../hooks/serverEvents'
import {
  Table,
  Button,
} from "semantic-ui-react";

function ReservedEntry(props) {
  
  return (
    
    <Table.Row>
      <Table.Cell>
        {props.reservation.title}
        {props.reservation.book_id}
        {}
      </Table.Cell>
      <Table.Cell>{props.reservation.author}</Table.Cell>
      <Table.Cell>
        Pick up {moment(props.reservation.start_date, "YYYY-MM-DD").fromNow()} <br />{" "}
        {props.reservation.start_date}
      </Table.Cell>
      <Table.Cell>
        Return {moment(props.reservation.end_date, "YYYY-MM-DD").fromNow()} <br />{" "}
        {props.reservation.end_date}
      </Table.Cell>

      <Table.Cell>
        
        <EditModal reservation={props.reservation} setState={props.setState}/>
        </Table.Cell>
        <Table.Cell>
        <Button
          size='big'
          compact
          color="red"
          onClick={() => cancelReservation(props.reservation.reserve_id, props.reservation, props.setState, props.dispatch)}
        >
          Cancel
        </Button>
      </Table.Cell>
    </Table.Row>
  )
    
  }



export default ReservedEntry;