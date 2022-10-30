import './ListItem.css';
import { useEffect, useCallback } from 'react';
import { updateItem } from '../api/firebase';

const millisecondsIn24hrs = 86400000;
const currentDate = new Date();
const currentTime = currentDate.getTime();

export function ListItem({ listToken, item }) {
	let calcDate = item.dateLastPurchased
		? item.dateLastPurchased.seconds * 1000
		: null;

	useEffect(() => {
		let timer = currentTime - calcDate;
		if (item.isChecked && timer > millisecondsIn24hrs) {
			updateItem(listToken, item, {
				isChecked: !item.isChecked,
			});
		}
	}, [item, listToken, calcDate]);

	const handleChange = useCallback(async () => {
		if (item.isChecked === false) {
			await updateItem(listToken, item, {
				isChecked: item.isChecked,
				dateLastPurchased: item.dateLastPurchased,
				totalPurchases: item.totalPurchases++,
			});
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
