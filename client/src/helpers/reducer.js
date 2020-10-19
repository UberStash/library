export const reducer = (searchState, action)  => {
  
  const initialState = {
    loading: false,
    results: [],
    value: "",
  };
  
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...searchState, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...searchState, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...searchState, value: action.selection };

    default:
      throw new Error('There was an error please try again!');
  }
}

