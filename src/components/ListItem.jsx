import './ListItem.css';
import { useEffect, useCallback } from 'react';
import { updateItem } from '../api/firebase';

const millisecondsIn24hrs = 86400000;

export function ListItem({ listToken, item }) {
	let calcDate = item.dateLastPurchased
		? item.dateLastPurchased.seconds * 1000
		: null;

	useEffect(() => {
		const currentDate = new Date();
		const currentTime = currentDate.getTime();
		let timer = currentTime - calcDate;
		if (item.isChecked && timer >= millisecondsIn24hrs) {
			updateItem(listToken, item, {
				isChecked: !item.isChecked,
			});
		}
	});

	const handleChange = useCallback(async () => {
		if (item.isChecked === false) {
			await updateItem(listToken, item, {
				isChecked: item.isChecked,
				dateLastPurchased: new Date().getTime(),
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
