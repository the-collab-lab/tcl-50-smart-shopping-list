import './ListItem.css';
import { useEffect, useCallback } from 'react';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { updateItem } from '../api/firebase';
import { getFutureDate } from '../utils';

const millisecondsIn24hrs = 86400000;

export function ListItem({ listToken, item }) {
	useEffect(() => {
		let calcDate = item.dateLastPurchased
			? item.dateLastPurchased.seconds * 1000
			: null;
		const currentDate = new Date();
		const currentTime = currentDate.getTime();
		let timer = currentTime - calcDate;
		console.log(item.isChecked && timer >= millisecondsIn24hrs);
		if (item.isChecked && timer >= millisecondsIn24hrs) {
			updateItem(listToken, item, {
				// id: item.id,
				isChecked: false,
				dateLastPurchased: item.dateLastPurchased,
				// totalPurchases: item.totalPurchases,
			});
		}
	}, []);

	let prev = 2;
	let days = 3;

	console.log(calculateEstimate(prev, days, 7));

	let ans = calculateEstimate(prev, days, 3);
	// console.log(ans);
	// console.log(getFutureDate(ans));
	/**
	 * convert days to date
	 * take note of dateLastPurchased
	 * add calculate estimate to dateLastpuchased to get the date of next purchase
	 *  */

	const handleChange = useCallback(async () => {
		if (!item.isChecked) {
			await updateItem(listToken, item, {
				id: item.id,
				isChecked: true,
				dateLastPurchased: item.dateLastPurchased,
				totalPurchases: item.totalPurchases + 1,
				//  dateCreated: item.dateCreated.seconds,
				// 	// previousEstimate: item.previousEstimate,
				// 	// currentEstimate: item.currentEstimate,
				// 	// dateNextPurchased: item.dateNextPurchased,
			});
			// await updateItem(listToken, item, {
			// 	id: item.id,
			// 	isChecked: !item.isChecked,
			// 	dateLastPurchased: new Date(),
			// 	totalPurchases: item.totalPurchases + 1,
			// 	// dateCreated: item.dateCreated.seconds,
			// 	// previousEstimate: item.previousEstimate,
			// 	// currentEstimate: item.currentEstimate,
			// 	// dateNextPurchased: item.dateNextPurchased,
			// });
		}
	}, [listToken, item]);

	return (
		<>
			<li className="ListItem">
				<label htmlFor={item.id}>
					<input
						type="checkbox"
						id={item.id}
						checked={item.isChecked}
						onChange={handleChange}
						name={item.name}
					/>
					{item.name}
				</label>
			</li>
		</>
	);
}
