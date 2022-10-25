import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api/firebase';
import { getFutureDate } from '../utils';

export function ListItem({ listId, itemData, name, id }) {
	const [isChecked, setIsChecked] = useState(false);
	const [lastPurchaseTime, setLastPurchaseTime] = useState(1);
	const [totalPurchasesValue, setTotalPurchasesValue] = useState(0);
	// const { totalPurchases, dateLastPurchased} = itemData

	function minuteLastPurchase() {
		// get current time
		const currentTime = new Date().getTime();
		//  let cal= (Math.floor(Date.now()/1000) - itemData.dateLastPurchased) /60

		console.log(currentTime);
		return currentTime;
	}

	const handleChange = async () => {
		setIsChecked(!isChecked);
		//  const itemUpdate = await updateItem(listId, {
		// 	isChecked: isChecked,
		// 	itemName:name,
		// 	dateLastPurchased:minuteLastPurchase(),
		// 	totalPurchases: itemData.totalPurchases + 1
		// })
		if (!isChecked) {
			await updateItem(listId, {
				isChecked: isChecked,
				itemName: name,
				dateLastPurchased: minuteLastPurchase(),
				totalPurchases: 1,
			});

			console.log('yippee');
		} else {
			// setIsChecked(!isChecked)
			console.log('uhoooo');
		}

		/*
		 *when user checks the box update dateLastPurchased and totalPurchases properties on the corresponding Firestore document
		 ** the date exact time user checks boxs is stored. total purchases is increased by 1
		 ** after 24 hrs we set the checkbox to automatically uncheck by comparing date& time checked with the current time. if date checked is > 24hrs, we uncheck the box
		 */
		//   if(itemData.dateLastPurchased === null || minuteLastPurchase() >= 86400 ){
		// updateItem(item, id, itemData.id)
		// setIsChecked(false)
		// }else{
		// 	const updatePurchases = itemData.totalPurchases + 1
		// 	//setIsChecked(true)
		// 	const item = {
		// 		isChecked: true,
		// 		totalPurchases: updatePurchases
		// 	}
		// 	updateItem(item, id, itemData.id)
		// }

		// console.log(isChecked)
	};
	//  function purchaseWithIn24Hrs(){
	// 	if (itemData.dateLastPurchased === null){
	// 		return false
	// 	}
	// 	return minuteLastPurchase() <= 86400; // one day in seconds
	//  }
	return (
		<>
			<li className="ListItem">
				<label htmlFor={id}>
					<input
						type="checkbox"
						id={id}
						checked={isChecked}
						onChange={handleChange}
						//  disabled={purchaseWithIn24Hrs}
					/>
					{name}
				</label>
			</li>
		</>
	);
}
