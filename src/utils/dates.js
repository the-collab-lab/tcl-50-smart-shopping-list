const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(dateLastPurchased) {
	let currentTime = new Date().getTime();

	let diff = currentTime - dateLastPurchased.toMillis();

	let diffDay = Math.ceil(diff / ONE_DAY_IN_MILLISECONDS);
	return Math.abs(diffDay);
}
