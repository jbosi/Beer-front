export function formatDateToHoursMinutes(inputDate: Date): string {
	const date = new Date(inputDate);
	if (date == null) {
		return 'NA';
	}
	const hours = date.getHours();
	const minutes = date.getMinutes();
	
	return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}	