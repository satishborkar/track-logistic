import shipmentApiService from "../api";
import * as ACTIONS from "./types";

export function getShipments() {
  return function(dispatch) {
    dispatch({ type: ACTIONS.SHIPMENTS_INIT });
    dispatch({ type: ACTIONS.SHIPMENTS_PENDING });
    return shipmentApiService
      .fetchShipments()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          dispatch({ type: ACTIONS.SHIPMENTS_SUCCESS, payload: data });
        } else {
          dispatch({ type: ACTIONS.SHIPMENTS_FAIL });
        }
      })
      .catch(error => {
        dispatch({ type: ACTIONS.SHIPMENTS_FAIL });
        throw error;
      });
  };
}

export function getShipment(id) {
  return function(dispatch) {
    dispatch({ type: ACTIONS.SHIPMENT_INIT });
    dispatch({ type: ACTIONS.SHIPMENT_PENDING });
    return shipmentApiService
      .fetchShipment(id)
      .then(data => {
        if (Object.keys(data).length > 0) {
          dispatch({ type: ACTIONS.SHIPMENT_SUCCESS, payload: data });
        } else {
          dispatch({ type: ACTIONS.SHIPMENT_FAIL });
        }
      })
      .catch(error => {
        dispatch({ type: ACTIONS.SHIPMENT_FAIL });
        throw error;
      });
  };
}

export function updateShipment(shipmentDetails) {
  return function(dispatch) {
    dispatch({ type: ACTIONS.SHIPMENT_UPDATE_INIT });
    dispatch({ type: ACTIONS.SHIPMENT_UPDATE_PENDING });
    return shipmentApiService
      .updateShipment(shipmentDetails)
      .then(data => {
        dispatch({ type: ACTIONS.SHIPMENT_UPDATE_SUCCESS, payload: data });
      })
      .catch(error => {
        dispatch({ type: ACTIONS.SHIPMENT_UPDATE_FAIL });
        throw error;
      });
  };
}
