import * as actionTypes from "../actions/types";
import initialState from "./initialState";

const updateShipmentReducer = (
  state = initialState.lastUpdatedShipment,
  action
) => {
  switch (action.type) {
    case actionTypes.SHIPMENT_UPDATE_INIT:
      return {
        ...state,
        isUpdating: false,
        isUpdated: false,
        isUpdatingError: false,
        data: []
      };
    case actionTypes.SHIPMENT_UPDATE_PENDING:
      return {
        ...state,
        isUpdating: true,
        isUpdated: false,
        isUpdatingError: false,
        data: []
      };
    case actionTypes.SHIPMENT_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        isUpdated: true,
        isUpdatingError: false,
        data: action.payload
      };
    case actionTypes.SHIPMENT_UPDATE_FAIL:
      return {
        ...state,
        isUpdating: false,
        isUpdated: false,
        isUpdatingError: true,
        data: []
      };
    default:
      return state;
  }
};

export default updateShipmentReducer;
