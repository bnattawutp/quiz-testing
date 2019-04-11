/* @flow */
const initialState = {
  byIds: []
};

const saveDataState = (state, action) => {
  return {
    ...state,
    byIds: action.question
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'DOWNLOAD_DATA_FIREBASE':
      return saveDataState(state, action);
    default:
      return state;
  }
}
