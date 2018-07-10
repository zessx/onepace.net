import Config from "webpack-config";

export default class NetworkHandler {
	static async request(route, data, onSuccess, onError) {
		onSuccess = onSuccess == null ? (f) => f : onSuccess;
		onError = onError == null ? (f) => f : onError;
		try {
			const response = await fetch(Config.ServerURL + route, {
				"method": "POST",
				"headers": {
					"Content-Type": "multipart/form-data",
					"Accept": "application/json"
				},
				"body": data,
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
