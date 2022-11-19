import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../components';

export function List({ data, listToken }) {
	const navigate = useNavigate();
	const [searchItem, setSearchItem] = useState('');
	const [copy, setCopy] = useState('Copy Token');

	//sorted by ascending currentEstimate (days until next purchase) & then alphabetically
	function comparePurchaseUrgency(a, b) {
		if (a.currentEstimate < b.currentEstimate) {
			return -1;
		}
		if (a.currentEstimate > b.currentEstimate) {
			return 1;
		} else {
			if (a.name < b.name) {
				return -1;
			} else if (a.name > b.name) {
				return 1;
			} else {
				return 0;
			}
		}
	}

	const filteredItems = data
		?.sort(comparePurchaseUrgency)
		?.filter((item) =>
			item?.name.toLowerCase().includes(searchItem.toLowerCase()),
		);

	const copyToken = async () => {
		await window.navigator.clipboard.writeText(listToken);
		setTimeout(() => {
			setCopy('Copy Token');
		}, 3000);

		setCopy('Copied!');
	};
	return (
		<>
			{data.length ? (
				<>
					{listToken && (
						<div>
							<p>Your list : {listToken}</p>
							<button onClick={copyToken}>{copy}</button>
						</div>
					)}
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
		</>
	);
}
