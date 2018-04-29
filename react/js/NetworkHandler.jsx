import Config from "webpack-config";
require("es6-promise").polyfill();
require("isomorphic-fetch");

export default class NetworkHandler {
  static async request(route, data, onSuccess = (f) => f, onError = (f) => f) {
    try {
      const response = await fetch(Config.ServerURL + route, {
        "method": "POST",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        "body": JSON.stringify(data),
      });
      if (response.status == 200) {
        const responseJson = await response.json();
        onSuccess({
          ...responseJson,
          "status": response.status,
          "message": response.statusText,
        });
      } else {
        onError({
          "status": response.status,
          "message": response.statusText,
        });
      }
      return response.responseText;
    } catch (e) {
      onError({
        "status": 500,
        "message": e.message,
      });
    }
  }
}
