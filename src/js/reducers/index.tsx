import { combineReducers } from "redux";
import shipmentsReducer from "./shipments";
import shipmentReducer from "./shipment";
import updateShipment from "./updateShipment";

const rootReducer = combineReducers({
  shipments: shipmentsReducer,
  shipment: shipmentReducer,
  lastUpdatedShipment: updateShipment
});

export default rootReducer;
