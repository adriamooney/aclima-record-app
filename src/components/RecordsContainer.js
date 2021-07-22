import { List } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Fragment } from 'react';

import Record from './Record';

// Pagination has been implemented here and is functional but there is a bug.  To reproduce, add a record to a shelf and then go to a new page and try to add another
// TypeError: Cannot read property 'id' of undefined  src/components/Shelf.js:84.  ShelfRecords.map(record, index)  (record is undefined)

export default function RecordsContainer({ records, shelves, username, page, handlePageChange, dispatch }) {
  return (
    <>
     <h2>Records for {username }</h2>
     {records.length > 0 ?
     <Fragment>
      <List
        className='records-container'
        style={{
          height: 'calc(100vh - 12rem)',
          display:'flex',
          flexDirection:'column'
        }}
      >
        {records.map(record => (
          
          <Record
            key={record.id}
            record={record}
            shelves={shelves}
            dispatch={dispatch}
          />
        ))}
      </List>
      
      <Pagination count={10} onChange={handlePageChange} page={page} style={{marginTop: '10px'}}/>
      </Fragment>
      :
      <div> There is a problem retrieving records for this user, or this user may not exist.</div>
      }
    </>
  );
}
