import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem() {
	const [newItem, setNewItem] = useState('');
	const [nextPurchaseTime, setPurchaseTime] = useState(7);
	const [statusMessage, setStatusMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		let listId = 'my test list';

		const item = await addItem(listId, {
			itemName: newItem,
			daysUntilNextPurchase: nextPurchaseTime,
		});

		if (item.id) {
			setStatusMessage('Item Successfully Added!');
			setNewItem('');
			setPurchaseTime(7);
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
					/>
				</div>

				<div>
					<fieldset onChange={(e) => setPurchaseTime(e.target.value)}>
						<legend>How soon will you buy this again?</legend>

						<div>
							<input
								type="radio"
								id="soon"
								name="duration"
								value={7}
								defaultChecked
							/>
							<label htmlFor="soon">Soon</label>
						</div>

						<div>
							<input
								type="radio"
								id="kind of soon"
								name="duration"
								value={14}
							/>
							<label htmlFor="kind of soon">Kind of Soon</label>
						</div>

						<div>
							<input type="radio" id="not soon" name="duration" value={30} />
							<label htmlFor="not soon">Not Soon</label>
						</div>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
				{statusMessage && <p>{statusMessage}</p>}
			</form>
		</>
	);
}
