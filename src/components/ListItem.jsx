import './ListItem.css';
import { useEffect, useCallback } from 'react';
import { updateItem } from '../api/firebase';

const millisecondsIn24hrs = 86400000;

export function ListItem({ listToken, item }) {
	useEffect(() => {
		let calcDate = item.dateLastPurchased
			? item.dateLastPurchased.seconds * 1000
			: null;
		const currentDate = new Date();
		const currentTime = currentDate.getTime();
		let timer = currentTime - calcDate;

		if (item.isChecked && timer >= millisecondsIn24hrs) {
			updateItem(listToken, {
				id: item.id,
				isChecked: false,
			});
		}
	}, [item]);

	const handleChange = useCallback(async () => {
		if (!item.isChecked) {
			item.isChecked = true;
			item.totalPurchases += 1;
			await updateItem(listToken, item);
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
