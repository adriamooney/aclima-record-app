import { useCallback, useState } from 'react';

import {
  Box,
  Button,
  Input,
  List,
  ListItem,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Droppable, Draggable } from 'react-beautiful-dnd';

import Record from './Record';

export default function Shelf({ records, shelf, dispatch }) {
  const shelfRecords = shelf.records.map(id =>
    records.find(record => id === record.id),
  );


  const [renaming, setRenaming] = useState(false);
  const [inputName, setInputName] = useState(shelf.name);

  const handleSubmit = useCallback(() => {
    dispatch({ type: 'renameShelf', id: shelf.id, name: inputName });
    setRenaming(false);
  }, [dispatch, inputName, shelf]);

  return (
    <>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {renaming ? (
          <Input
            variant="filled"
            value={inputName}
            onChange={evt => setInputName(evt.target.value)}
            onBlur={handleSubmit}
            onEnter={handleSubmit}
          />
        ) : (
          <h3 onClick={() => setRenaming(true)} style={{ cursor: 'pointer' }}>
            {shelf.name}
          </h3>
        )}
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'deleteShelf', id: shelf.id })}
          style={{ marginLeft: '1rem' }}
        >
          <DeleteForeverIcon />
        </Button>
      </Box>

      <ListItem
        key={shelf.id}
        className='shelf'
        style={{
          backgroundColor: '#23a6d5',
          minHeight: '10rem',
          marginBottom: '1rem',
          overflowX:'auto',
          borderRadius: '4px'
        }}
      >
        
        <Droppable droppableId={shelf.id} direction="horizontal" type='ROOT'>
          {(provided, snapshot) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: 'flex',
                flexDirection: 'row'
                
              }}
            >
              {shelfRecords.length ? (
                shelfRecords.map((record, index) => (
     
                
                  <Draggable
                    key={record.id}
                    draggableId={record.id}
                    index={index}
                    type='ROOT'
                  >
                    {(provided, snapshot) => (
                      <span
                        key={record.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Record
                          record={record}
                          shelf={shelf}
                          dispatch={dispatch}
                        />
                      </span>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No records in shelf</p>
              )}
              
            </List>
          )}
        </Droppable>
      </ListItem>
    </>
  );
}
