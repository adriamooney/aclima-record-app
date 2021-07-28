let shelfIdCounter = 0;

export const reducer = (state, action) => {
  switch (action.type) {
    case 'createShelf':
      const id = `shelf-${shelfIdCounter}`;
      shelfIdCounter++;
      return {
        ...state,
        [id]: {
          id,
          name: action.name,
          records: [],
        },
      };
    case 'deleteShelf':
      return Object.entries(state).reduce((newState, [id, value]) => {
        if (id !== action.id) {
          newState[id] = value;
        }
        return newState;
      }, {});
    case 'renameShelf':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          name: action.name,
        },
      };
    case 'addRecordToShelf':
      const recordIdsOnShelf = state[action.shelfId].records;
      // if shelf already contains record, don't add it again
      // return records array again as is.  otherwise add the new
      // recordId to the records array
      if(recordIdsOnShelf.includes(action.recordId)) {
        alert('You have already added this record to the shelf');
        return {
          
          ...state,
          [action.shelfId]: {
            ...state[action.shelfId],
            records: state[action.shelfId].records,
          },
        }
      }
      else {
        return {
          
          ...state,
          [action.shelfId]: {
            ...state[action.shelfId],
            records: state[action.shelfId].records.concat(action.recordId),
          },
        }
    };
    case 'removeRecordFromShelf':
      return {
        ...state,
        [action.shelfId]: {
          ...state[action.shelfId],
          records: state[action.shelfId].records.filter(
            id => id !== action.recordId,
          ),
        },
      };
    case 'reorderInShelf':
      const newOrder = [...state[action.shelfId].records];
      const [record] = newOrder.splice(action.oldIndex, 1);
      newOrder.splice(action.newIndex, 0, record);
      return {
        ...state,
        [action.shelfId]: {
          ...state[action.shelfId],
          records: newOrder,
        },
      };
    case 'moveBetweenShelves':
      const newShelf = [...state[action.newShelf].records];
      newShelf.splice(
        action.newIndex,
        0,
        state[action.oldShelf].records[action.oldIndex],
      );

      return {
        ...state,
        [action.oldShelf]: {
          ...state[action.oldShelf],
          records: state[action.oldShelf].records.filter(
            (record, index) => index !== action.oldIndex,
          ),
        },
        [action.newShelf]: {
          ...state[action.newShelf],
          records: newShelf,
        },
      };
    default:
      throw new Error();
  }
};
