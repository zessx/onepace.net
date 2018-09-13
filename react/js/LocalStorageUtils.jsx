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
	static getWatchSelectedArcId() {
		const value = localStorage.getItem("watchSelectedArcId");
		if(isNaN(value)) {
			return null;
		}
		return value;
	}
	static setWatchSelectedArcId(value) {
		if(isNaN(value)) {
			value = null;
		}
		localStorage.setItem("watchSelectedArcId", value);
	}
	static getWatchSelectedEpisodeId() {
		const value = localStorage.getItem("watchSelectedEpisodeId");
		if(isNaN(value)) {
			return null;
		}
		return value;
	}
	static setWatchSelectedEpisodeId(value) {
		if(isNaN(value)) {
			value = null;
		}
		localStorage.setItem("watchSelectedEpisodeId", value);
	}
	static getUser() {
		const user = localStorage.getItem("user");
		return user && user !== 'undefined' && JSON.parse(user) || null;
	}
	static setUser(value) {
		let json = '';
		if(value) {
			json = JSON.stringify(value);
		} else {
			json = null;
		}
		localStorage.setItem("user", json);
	}
}
