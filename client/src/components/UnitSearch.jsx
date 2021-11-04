import { Search } from 'semantic-ui-react';
import React, {
  useRef, useCallback, useEffect, useReducer,
} from 'react';
import { useHistory } from 'react-router-dom';
import * as unitsService from '../services/units';

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

function UnitSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, results, value } = state;

  const history = useHistory();

  const timeoutRef = useRef();

  const handleSearchChange = useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({
      type: 'START_SEARCH',
      query: data.value,
    });

    if (data.value.length === 0) {
      dispatch({ type: 'CLEAN_QUERY' });
      return;
    }

    timeoutRef.current = setTimeout(() => {
      unitsService.searchUnits(data.value)
        .then((objects) => {
          const { newData } = objects;
          dispatch({
            type: 'FINISH_SEARCH',
            results: newData,
          });
        });
    }, 500);
  }, [results]);

  useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  const resultRenderer = ({code, title}) => (
    <div>
      {code}
      {'-'}
      {title}
    </div>
  );

  return (
    <Search
      loading={loading}
      // eslint-disable-next-line no-underscore-dangle
      onResultSelect={(e, data) => history.push(`/unit/${data.result._id}`)}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={results}
      value={value}
    />
  );
}

export default UnitSearch;
