import produce from 'immer';
import { EXAMPLE } from '../constants';

const initState = {
  example: true
};

const reducer = (state = initState, action = {}) => produce(
  state, draft => {
    switch (action.type) {
      case EXAMPLE:
        draft.example = false;
        break;
      default:
        return state;
    }
  }
);

export default reducer;
