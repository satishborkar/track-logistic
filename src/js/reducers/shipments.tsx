import * as actionTypes from "../actions/types";
import initialState from "./initialState";

const shipmentsReducer = (state = initialState.shipments, action) => {
  switch (action.type) {
    case actionTypes.SHIPMENTS_INIT:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFetchingError: false,
        data: []
      };
    case actionTypes.SHIPMENTS_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFetchingError: false,
        data: []
      };
    case actionTypes.SHIPMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFetchingError: false,
        data: action.payload
      };
    case actionTypes.SHIPMENTS_FAIL:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFetchingError: true,
        data: []
      };
    default:
      return state;
  }
};

export default shipmentsReducer;
