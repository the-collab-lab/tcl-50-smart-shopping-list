import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem() {
	const [newItem, setNewItem] = useState('');
	const [nextPurchaseTime, setPurchaseTime] = useState(7);
	const [statusMessage, setStatusMessage] = useState('');
	const [alertVisible, setAlertVisible] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let listId = 'my test list';

		const item = await addItem(listId, {
			itemName: newItem,
			daysUntilNextPurchase: nextPurchaseTime,
		});

		if (item.id) {
			setAlertVisible(true);
			setStatusMessage(`${newItem} Successfully Added!`);

			setNewItem('');
			setPurchaseTime(7);

			setTimeout(() => {
				setAlertVisible(false);
			}, 3000);
		} else {
			setStatusMessage('Item Not Added!');
		}
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
						required
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
								defaultChecked
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
							/>
							<label htmlFor="not_soon">Not Soon</label>
						</div>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
				{alertVisible && statusMessage && <p>{statusMessage}</p>}
			</form>
		</>
	);
}
