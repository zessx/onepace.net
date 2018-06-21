export default class LocalStorageUtils {
	static getSidebarToggled() {
		const value = localStorage.getItem("sidebarToggled");
		return value === "true";
	}
	static setSidebarToggled(value) {
		localStorage.setItem("sidebarToggled", value);
	}
	static getSortField() {
		return localStorage.getItem("sortField");
	}
	static setSortField(value) {
		localStorage.setItem("sortField", value);
	}
	static getSortAscending() {
		return localStorage.getItem("sortAscending");
	}
	static setSortAscending(value) {
		localStorage.setItem("sortAscending", value);
	}
	static getWatchSelectedEpisodeId() {
		return localStorage.getItem("watchSelectedEpisodeId");
	}
	static setWatchSelectedEpisodeId(value) {
		localStorage.setItem("watchSelectedEpisodeId", value);
	}
	static getToken() {
		return localStorage.getItem("token");
	}
	static setToken(value) {
		localStorage.setItem("token", value);
	}
}
