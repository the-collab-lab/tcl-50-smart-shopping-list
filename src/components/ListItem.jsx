import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ listToken, item }) {
	const [isCheckedBox, setIsCheckedBox] = useState(false);
	// const [purchasedItem, setPurchasedItem] = useState(item.isChecked);
	let expiryDate = item.dateLastPurchased;

	//
	const handleChange = () => {
		if (item.isChecked === false) {
			updateItem(listToken, item, {
				isChecked: item.isChecked,
				dateLastPurchased: item.dateLastPurchased,
				totalPurchases: item.totalPurchases++,
			});
			console.log(item.dateLastPurchased.seconds);
			console.log(expiryDate);
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
	function minuteLastPurchase() {
		// get current time
		const currentTime = new Date().getTime();
		let cal = (Math.floor(Date.now() / 1000) - item.dateLastPurchased) / 60;

		return cal;
	}
	function purchaseWithIn24Hrs() {
		if (item.dateLastPurchased === null) {
			return false;
		}
		return minuteLastPurchase() <= 86400; // one day in seconds
	}

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
						disabled={purchaseWithIn24Hrs()}
					/>
					{item.name}
				</label>
			</li>
		</>
	);
}
