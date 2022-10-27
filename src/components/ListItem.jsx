import './ListItem.css';
import { useEffect } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ listToken, item }) {
	useEffect(() => {
		if (item.isChecked) {
			let calcDate = item.dateLastPurchased.seconds * 1000 + 86400000;
			console.log(calcDate);
			// let testDate = 4000;

			let convertDate = new Date(calcDate);
			console.log(convertDate);

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

			console.log(item.dateLastPurchased);
		} else {
			updateItem(listToken, item, {
				isChecked: !item.isChecked,

				totalPurchases: item.totalPurchases + 0,
			});
		}
	};
	/*
	 *when user checks the box update dateLastPurchased and totalPurchases properties on the corresponding Firestore document
	 ** the date exact time user checks boxs is stored. total purchases is increased by 1
	 ** after 24 hrs we set the checkbox to automatically uncheck by comparing date& time checked with the current time. if date checked is > 24hrs, we uncheck the box
	 */

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
