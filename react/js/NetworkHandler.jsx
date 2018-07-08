import Config from "webpack-config";

export default class NetworkHandler {
	static async post(route, data, onSuccess, onError) {
		onSuccess = onSuccess == null ? (f) => f : onSuccess;
		onError = onError == null ? (f) => f : onError;
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
	static async file(route, file, onSuccess, onError) {
		const formData = new FormData();
		formData.append("file", file);
		onSuccess = onSuccess == null ? (f) => f : onSuccess;
		onError = onError == null ? (f) => f : onError;
		try {
			const response = await fetch(Config.ServerURL + route, {
				"method": "POST",
				"headers": {
					"Content-Type": "multipart/form-data"
				},
				"body": formData,
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
	static async get(route, data, onSuccess, onError) {
		onSuccess = onSuccess == null ? (f) => f : onSuccess;
		onError = onError == null ? (f) => f : onError;
		try {
			var query = "";
			for (var key in data) {
				if (query == "") {
					query = "?";
				} else {
					query += "&";
				}
				if(data[key] == null) {
					data[key] = "";
				}
				query += key + "=" + encodeURIComponent(data[key]);
			}
			const response = await fetch(Config.ServerURL + route + query, {
				"method": "GET",
				"headers": {
					"Accept": "application/json",
					"Content-Type": "application/json",
				}
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
