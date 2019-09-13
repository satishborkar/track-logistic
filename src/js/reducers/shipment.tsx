import * as actionTypes from "../actions/types";
import initialState from "./initialState";

const shipmentReducer = (state = initialState.shipment, action) => {
  switch (action.type) {
    case actionTypes.SHIPMENT_INIT:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFetchingError: false,
        data: []
      };
    case actionTypes.SHIPMENT_PENDING:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFetchingError: false,
        data: []
      };
    case actionTypes.SHIPMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFetchingError: false,
        data: action.payload
      };
    case actionTypes.SHIPMENT_FAIL:
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

export default shipmentReducer;
