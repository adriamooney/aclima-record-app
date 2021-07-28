import { useCallback, useReducer, useState } from 'react';

import { Container, Grid, TextField, Button, CircularProgress } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';

import { reducer } from './reducer';

import RecordsContainer from './components/RecordsContainer';
import Shelves from './components/Shelves';

export default function App() {
  const [records, setRecords] = useState([]);

  const [shelves, dispatch] = useReducer(reducer, {});

  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [data, setData] = useState(false);

  const fetchRecords = async() => {
    const response = await fetch(`https://api.discogs.com/users/${username}/collection/folders/0/releases?page=${page}&per_page=10`);
    const data = await response.json();

    if(response.ok && data.releases ) {
      setRecords(
        data.releases.map(release => {
          const { id, basic_information: info } = release;
          return {
            id: `${id}`,
            title: info.title,
            formats: info.formats.map(format => format.name),
            label: info.labels?.[0]?.name ?? '',
            artists: info.artists.map(artist => artist.name),
            date: info.year,
          };
        })
      );
    }
    else {
      setRecords([]);
    }
    setLoading(false);
    setData(true);
    return data;

  }

  const handlePageChange = (event, value) => {
    setPage(value);
    setLoading(true);
    fetchRecords();
  };

  const handleSubmit = e => {
      e.preventDefault();
      setLoading(true);

      if (!username) {
        setLoading(false);
        return;
      }
      
    fetchRecords();

  }

  const onDragEnd = useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      if(source.droppableId === 'records') {
        dispatch({
          type: 'addRecordToShelf',
          shelfId: destination.droppableId,
          recordId: source.index,
        });
      }
      else {
        if (source.droppableId === destination.droppableId) {
          dispatch({
            type: 'reorderInShelf',
            shelfId: source.droppableId,
            oldIndex: source.index,
            newIndex: destination.index,
          });
        } else {
          dispatch({
            type: 'moveBetweenShelves',
            oldShelf: source.droppableId,
            newShelf: destination.droppableId,
            oldIndex: source.index,
            newIndex: destination.index,
          });
        }
      }

 
    },
    [dispatch],
  );


  
  return (
    
    <Container className="main">
      <h1>Record Shelves App</h1>

      {!data &&
          <Grid container spacing={12}>
          <h4>Enter your Discog username to start organizing your record collection</h4>
          </Grid>
      }

      <Grid item xs={12}>
        <form onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}> 
          <TextField 
          id="standard-basic" 
          label="Discog username" 
          variant="outlined"
          value={username} 
          InputProps={{endAdornment: <Button type="submit" variant="contained">Enter</Button>}}
          style={{
            flexGrow: 1
          }}
          onChange={(e) => setUsername(e.target.value)} 
          /> 

        </form>
        
      </Grid> 

      {loading && <div><CircularProgress /></div>}

      {data &&
  
      <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={3}>
          <Grid item sm={12} md={4}>
         
            <RecordsContainer
              className="records-container-dnd"
              records={records}
              shelves={shelves}
              dispatch={dispatch}
              username={username}
              page={page}
              handlePageChange={ handlePageChange }
            />
            
          </Grid>

          <Grid item sm={12} md={8}>
           
              <Shelves records={records} shelves={shelves} dispatch={dispatch} />
            
          </Grid>
        </Grid> 
        </DragDropContext>
      } 
    </Container>

  );
}
