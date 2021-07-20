import { List } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Fragment } from 'react';

import Record from './Record';


export default function RecordsContainer({ records, shelves, username, page, handlePageChange, dispatch }) {
  return (
    <>
     <h2>Records for {username }</h2>
     {records.length > 0 ?
     <Fragment>
      <List
        style={{
          backgroundColor: '#f5f5f5',
          height: 'calc(100vh - 12rem)',
          overflow: 'scroll',
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
      <Pagination count={10} onChange={handlePageChange} page={page}/>
      </Fragment>
      :
      <div> There is a problem retrieving records for this user, or this user may not exist.</div>
      }
    </>
  );
}
