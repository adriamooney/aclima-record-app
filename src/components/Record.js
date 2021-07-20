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

export default function Record({ record, shelf, shelves, dispatch }) {
  return (
    <ListItem key={record.id} style={{ flex: 1, flexBasis:0 }}>
      <Card style={{ flex: 1, flexBasis:0, textAlign:'center' }}>
        <CardContent>
          <p><b>Title:</b> {record.title}</p>
          <p><b>Artist:</b> {record.artists.join(', ')}</p>
          <p><b>Label:</b> {record.label}</p>
          <p><b>Formats:</b> {record.formats.join(', ')}</p>
        </CardContent>

        <CardActions>
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
              Remove
            </Button>
          ) : Object.keys(shelves).length ? (
            <FormControl style={{ minWidth: '120px' }}>
              <InputLabel>Add to shelf</InputLabel>
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
        </CardActions>
      </Card>
    </ListItem>
  );
}

