import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
} from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';


export default function Record({ record, shelf, shelves, dispatch }) {
  return (
    <ListItem key={record.id}>
      <Card className="record">
        <div className="record-content">
        <CardContent>
          <p className="record-title"><b>{record.title}</b></p>
          <p><em>{record.artists.join(', ')}</em></p>
          <small>{record.label} / {record.formats.join(', ')}</small>
        </CardContent>

       
          {shelf ? (
            <Button
              onClick={() =>
                dispatch({
                  type: 'removeRecordFromShelf',
                  shelfId: shelf.id,
                  recordId: record.id,
                })
              }
            >
              <DeleteForeverIcon />
            </Button>
          ) : Object.keys(shelves).length ? (
            <FormControl className="record-action">
              <InputLabel><AddBoxIcon className="addBoxIcon" /></InputLabel>
              <Select
                data-testid="add-shelf"
                value=""
                onChange={evt =>
                  dispatch({
                    type: 'addRecordToShelf',
                    shelfId: evt.target.value,
                    recordId: record.id,
                  })
                }
              >
                {Object.values(shelves).map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
       
        </div>
      </Card>
    </ListItem>
  );
}

