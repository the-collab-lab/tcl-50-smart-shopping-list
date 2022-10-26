import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../components';

export function List({ data, listToken }) {
<<<<<<< HEAD
	const navigate = useNavigate();
=======
>>>>>>> afba910 (checkbox updates firestore)
	const [searchItem, setSearchItem] = useState('');

	const filteredItems = data?.filter((item) =>
		item?.name.toLowerCase().includes(searchItem.toLowerCase()),
	);
	console.log(filteredItems[0]);
	return (
		<>
<<<<<<< HEAD
			{data.length ? (
				<>
					<form>
						<label htmlFor="filter_items">Filter items </label>
						<input
							type="search"
							value={searchItem}
							id="filter_items"
							placeholder="Start typing here..."
							onChange={(e) => setSearchItem(e.target.value)}
						/>
					</form>
					<ul>
						{filteredItems.map((item) => (
							<ListItem item={item} key={item.id} listToken={listToken} />
						))}
					</ul>
				</>
			) : (
				<>
					<p>Your shopping list is currently empty.</p>
					<button onClick={() => navigate('/add-item')}>Add Item</button>
				</>
			)}
=======
			<form>
				<label htmlFor="filter_items">Filter items </label>
				<input
					type="search"
					value={searchItem}
					id="filter_items"
					placeholder="Start typing here..."
					onChange={(e) => setSearchItem(e.target.value)}
				/>
			</form>
			<ul>
				{filteredItems.map((item) => (
					<ListItem item={item} key={item.id} listToken={listToken} />
				))}
			</ul>
>>>>>>> b718420 (Created functions for handlechange and minuteLastPurchase.)
		</>
	);
}
