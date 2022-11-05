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
			updateItem(listToken, item, {
				isChecked: false,
				dateLastPurchased: item.dateLastPurchased,
			});
		}
	}, []);

	// const handleChange = useCallback(async () => {
	// 	if (!item.isChecked) {
	// 		await updateItem(listToken, item, {
	// 			id: item.id,
	// 			isChecked: true,
	// 			dateLastPurchased: new Date(),
	// 			totalPurchases: item.totalPurchases++,
	// 		});
	// 	}
	// }, [listToken, item]);

	const handleChange = () => {
		if (!item.isChecked) {
			updateItem(listToken, {
				id: item.id,
				isChecked: true,
				dateLastPurchased: item.dateLastPurchased,
				totalPurchases: item.totalPurchases++,
				dateCreated: item.dateCreated,
				previousEstimate: item.previousEstimate,
				currentEstimate: item.currentEstimate,
			});
		}
	};

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
