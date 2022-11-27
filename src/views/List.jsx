import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../components';

export function List({ data, listToken, isLoading }) {
	const navigate = useNavigate();
	const [searchItem, setSearchItem] = useState('');
	const [copy, setCopy] = useState('Copy Token');

	//This function redirect to home page onClick and clears token from local storage

	const goToAnotherList = () => {
		localStorage.removeItem('tcl-shopping-list-token');
		window.location.reload();
	};
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
		try {
			await window.navigator.clipboard.writeText(listToken);
			setTimeout(() => {
				setCopy('Copy Token');
			}, 3000);

			setCopy('Copied!');
		} catch (error) {
			setTimeout(() => {
				setCopy('Copy Token');
			}, 3000);
			setCopy('Error!, Try again.');
		}
	};
	return (
		<>
			{isLoading ? (
				'Loading...'
			) : data.length ? (
				<>
					{listToken && (
						<div className="flex items-center justify-center gap-2 lg:gap-4 my-3">
							<p>Your list: {listToken}</p>
							<button
								className="outline-2 p-2 bg-[#C2410C] text-white rounded-lg"
								onClick={copyToken}
							>
								{copy}
							</button>
						</div>
					)}
					<form className="flex flex-col my-5 justify-center items-center">
						<div className="w-[80%]">
							<label htmlFor="filter_items" className="self-start ">
								Filter items{' '}
							</label>
							<input
								type="search"
								value={searchItem}
								id="filter_items"
								placeholder="Start typing here..."
								onChange={(e) => setSearchItem(e.target.value)}
								className="w-[100%] p-4 lg:p-6 rounded-xl border-solid border-2 border-black bg-white"
							/>
						</div>
					</form>
					<div className="flex flex-col  gap-2 my-5 justify-center items-center">
						<ul className="w-[80%] ">
							{filteredItems.map((item) => (
								<ListItem item={item} key={item.id} listToken={listToken} />
							))}
						</ul>
					</div>

					<div className="flex justify-center text-white">
						<button
							className="goToAnotherList p-3 mb-20 lg:p-6 bg-[#C2410C] rounded-xl"
							onClick={goToAnotherList}
						>
							Go to another list
						</button>
					</div>
				</>
			) : (
				<div className="flex flex-col lg:max-w-[60vw] justify-center items-center gap-5 mt-10">
					<p className="text-center">Your shopping list is currently empty.</p>
					<button
						onClick={() => navigate('/add-item')}
						className="p-3 bg-green-500 rounded-xl w-[200px] text-white"
					>
						Add Item
					</button>
				</div>
			)}
		</>
	);
}
