import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ data, listToken }) {
	const [newItem, setNewItem] = useState('');
	const [nextPurchaseTime, setPurchaseTime] = useState(7);
	const [statusMessage, setStatusMessage] = useState('');

	//map old items and remove punctuation with regex
	const removePunc = data?.map((item) =>
		item?.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
	);
	console.log(removePunc);
	console.log(data);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newItem.trim().length === 0) {
			setStatusMessage('Please enter an item name');
			return;
		} else if (
			removePunc?.includes(newItem?.toLowerCase().replace(/[^a-z0-9]/gi, '')) //check for duplication
		) {
			setStatusMessage(`${newItem} already exist`);
			return;
		} else {
			const item = await addItem(listToken, {
				itemName: newItem,
				daysUntilNextPurchase: nextPurchaseTime,
			});
			setStatusMessage(` ${newItem} successfully added`);
			setNewItem('');
			setPurchaseTime(7);
			setTimeout(() => {
				setStatusMessage('');
			}, 3000);
		}

		// if (item.id) {
		// 	setStatusMessage(`${newItem} Successfully Added!`);

		// 	setNewItem('');
		// 	setPurchaseTime(7);

		// 	setTimeout(() => {
		// 		setStatusMessage('');
		// 	}, 3000);
		// } else {
		// 	setStatusMessage('Item Not Added!');
		// }
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Item Name</label>
					<input
						type="text"
						id="name"
						placeholder="Enter Item to Purchase"
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
						//required
					/>
				</div>

				<div>
					<fieldset>
						<legend>How soon will you buy this again?</legend>

						<div>
							<input
								type="radio"
								id="soon"
								name="duration"
								onChange={(e) => setPurchaseTime(e.target.value)}
								value={7}
								checked={7 === parseInt(nextPurchaseTime)}
							/>
							<label htmlFor="soon">Soon</label>
						</div>

						<div>
							<input
								type="radio"
								id="kind_of_soon"
								name="duration"
								value={14}
								onChange={(e) => setPurchaseTime(e.target.value)}
								checked={14 === parseInt(nextPurchaseTime)}
							/>
							<label htmlFor="kind_of_soon">Kind of Soon</label>
						</div>

						<div>
							<input
								type="radio"
								id="not_soon"
								name="duration"
								value={30}
								onChange={(e) => setPurchaseTime(e.target.value)}
								checked={30 === parseInt(nextPurchaseTime)}
							/>
							<label htmlFor="not_soon">Not Soon</label>
						</div>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
				{statusMessage && <p>{statusMessage}</p>}
			</form>
		</>
	);
}
