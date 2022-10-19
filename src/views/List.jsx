import { useState } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	const [searchItem, setSearchItem] = useState('');

	return (
		<>
			<form>
				<label htmlFor="filter_items">Filter items </label>
				<input
					type="text"
					value={searchItem}
					id="filter_items"
					placeholder="Start typing here..."
					onChange={(e) => setSearchItem(e.target.value)}
				/>
			</form>
			<ul>
				{data.map((item) => (
					<ListItem name={item.name} key={item.id} />
				))}
			</ul>
		</>
	);
}
