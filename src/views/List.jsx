import { useState, useEffect } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchItem, setSearchItem] = useState('');

	const filteredItems = data?.filter((item) =>
		item?.name.toLowerCase().includes(searchItem.toLowerCase()),
	);

	return (
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
					<ListItem name={item.name} key={item.id} />
				))}
			</ul>
		</>
	);
}
