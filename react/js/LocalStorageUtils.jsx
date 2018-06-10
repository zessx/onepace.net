export default class LocalStorageUtils {
	static valueToBool = (value) => {
		return value === "true";
	}
}

export const LocalStorageKeys = {
	SidebarToggled: "sidebarToggled",
	SortField: "sortField",
	SortAscending: "sortAscending",
	WatchSelectedEpisodeId: "watchSelectedEpisodeId"
};
