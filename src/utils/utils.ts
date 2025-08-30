export const formatDate = (isoString: string): string => {
	const date = new Date(isoString);
	const now = new Date();

	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	const timeString = date.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	});

	if (diffDays === 0) {
		return `Сегодня, ${timeString}`;
	} else if (diffDays === 1) {
		return `Вчера, ${timeString}`;
	} else if (diffDays >= 2 && diffDays <= 4) {
		return `${diffDays} дня назад, ${timeString}`;
	} else {
		return `${diffDays} дней назад, ${timeString}`;
	}
};

export const formatNumber = (number: number) => {
	return number.toLocaleString('ru-RU');
};
