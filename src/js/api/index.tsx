import { BASE_SERVER_URL } from "../constants";

class shipmentApiService {
  static fetchShipments() {
    return fetch(BASE_SERVER_URL)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  }

  static fetchShipment(id) {
    return fetch(`${BASE_SERVER_URL}/${id}`)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        throw err;
      });
  }

  static updateShipment(shipmentDetails) {
    return fetch(`${BASE_SERVER_URL}/${shipmentDetails.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shipmentDetails)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        return err;
      });
  }
}

export default shipmentApiService;
