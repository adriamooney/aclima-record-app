import { List } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Fragment } from 'react';

import Record from './Record';

import { Draggable, Droppable } from 'react-beautiful-dnd';

// Pagination has been implemented here and is functional but there is a bug.  To reproduce, add a record to a shelf and then go to a new page and try to add another
// TypeError: Cannot read property 'id' of undefined  src/components/Shelf.js:84.  ShelfRecords.map(record, index)  (record is undefined)

export default function RecordsContainer({ records, shelves, username, page, handlePageChange, dispatch }) {
  return (
    <>
     <h2>Records for {username }</h2>
     {records.length > 0 ?
     <Fragment>
      <Droppable droppableId="records" direction="horizontal" type="ROOT">
      {(provided, snapshot) => (
      <List
        ref={provided.innerRef}
        {...provided.droppableProps}
        className='records-container'
        style={{
          height: 'calc(100vh - 12rem)',
          display:'flex',
          flexDirection:'column'
        }}
      >
        {records.map((record, index) => (

        <Draggable
        key={record.id}
        draggableId={record.id}
        index={index}
        type="ROOT"
        >
          {(provided, snapshot) => (
          <span
            key={record.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
          
          <Record
            key={record.id}
            record={record}
            shelves={shelves}
            dispatch={dispatch}
          />
          </span>
           )}
          
          </Draggable>

        ))}
        
      </List>
      )}
      </Droppable>
      
      <Pagination count={10} onChange={handlePageChange} page={page} style={{marginTop: '10px'}}/>
      </Fragment>
      :
      <div> There is a problem retrieving records for this user, or this user may not exist.</div>
      }
    </>
  );
}
