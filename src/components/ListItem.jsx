import './ListItem.css';
import { useEffect } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ listToken, item }) {
	const millisecondsIn24hrs = 84600000;
	useEffect(() => {
		if (item.isChecked) {
			let calcDate =
				item.dateLastPurchased.seconds * 1000 + millisecondsIn24hrs;

			setTimeout(() => {
				updateItem(listToken, item, {
					isChecked: !item.isChecked,
				});
			}, calcDate);
		}
	}, [item, listToken]);
	//
	const handleChange = () => {
		if (item.isChecked === false) {
			updateItem(listToken, item, {
				isChecked: item.isChecked,
				dateLastPurchased: item.dateLastPurchased,
				totalPurchases: item.totalPurchases++,
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
