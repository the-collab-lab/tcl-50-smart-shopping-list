import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ data, listToken }) {
	const [newItem, setNewItem] = useState('');
	const [nextPurchaseTime, setPurchaseTime] = useState(7);
	const [statusMessage, setStatusMessage] = useState('');

	//map through existing list items and remove punctuation and spaces  with regex
	const removePunc = data?.map((item) =>
		item?.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (newItem.trim().length === 0) {
			setStatusMessage('Please enter an item name');
			setTimeout(() => {
				setStatusMessage('');
				setNewItem('');
			}, 3000);
		} else if (
			removePunc?.includes(newItem?.toLowerCase().replace(/[^a-z0-9]/gi, '')) //check for duplication
		) {
			setStatusMessage(`${newItem} already exists`);
			setTimeout(() => {
				setStatusMessage('');
				setNewItem('');
			}, 3000);
		} else {
			const item = await addItem(listToken, {
				itemName: newItem,
				daysUntilNextPurchase: nextPurchaseTime,
			});

			if (item.id) {
				setStatusMessage(` ${newItem} successfully added`);
				setNewItem('');
				setPurchaseTime(7);
				setTimeout(() => {
					setStatusMessage('');
				}, 3000);
			} else {
				setStatusMessage(` ${newItem} was not added`);
				setTimeout(() => {
					setStatusMessage('');
				}, 3000);
			}
		}
	};

	return (
		<>
			<form
				className="md:h-fit m-5 mt-10 sm:w-[360px] sm:flex-col sm:items-center sm:justify-center sm:content-center sm:h-[800px] "
				onSubmit={handleSubmit}
			>
				<div className="text-center sm:text-left">
					<label
						className="w-[92px] h-[30px]  font-normal leading-7"
						htmlFor="name"
					>
						Item Name
					</label>
					<br />
					<input
						className="md:w-[426px] mt-5 mb-5 md:mb-8 p-3 md:h-[46px] rounded-xl md:border-solid md:border-2 md:border-black bg-white sm:w-[243px] sm:h-[46px] border-solid border-1 border-black rounded-xl"
						type="text"
						id="name"
						placeholder="Enter Item to Purchase"
						value={newItem}
						onChange={(e) => setNewItem(e.target.value)}
					/>
				</div>

				<div className="mt-5">
					<fieldset>
						<legend className="text-center sm:text-left mt-5 font-bold leading-[26px]">
							How soon will you buy this again?
						</legend>

						<div className="mt-5">
							<input
								className="w-5 h-5 bg-[#D9D9D9] border-solid border-1 border-black"
								type="radio"
								id="soon"
								name="duration"
								onChange={(e) => setPurchaseTime(e.target.value)}
								value={7}
								checked={7 === parseInt(nextPurchaseTime)}
							/>
							<label
								className="ml-2 font-normal md:leading-5 sm:leading-[22px]"
								htmlFor="soon"
							>
								Soon
							</label>
						</div>

						<div className="mt-5">
							<input
								className="w-5 h-5 bg-[#D9D9D9] border-solid border-1 border-black"
								type="radio"
								id="kind_of_soon"
								name="duration"
								value={14}
								onChange={(e) => setPurchaseTime(e.target.value)}
								checked={14 === parseInt(nextPurchaseTime)}
							/>
							<label
								className="ml-2 font-normal md:leading-5 sm:leading-[22px]"
								htmlFor="kind_of_soon"
							>
								Kind of Soon
							</label>
						</div>

						<div className="mt-5">
							<input
								className="w-5 h-5 bg-[#D9D9D9] border-solid border-1 border-black"
								type="radio"
								id="not_soon"
								name="duration"
								value={30}
								onChange={(e) => setPurchaseTime(e.target.value)}
								checked={30 === parseInt(nextPurchaseTime)}
							/>
							<label
								className="ml-2 font-normal md:leading-5 sm:leading-[22px]"
								htmlFor="not_soon"
							>
								Not Soon
							</label>
						</div>
					</fieldset>
				</div>
				<div className="flex flex-col items-center">
					<button
						className="w-[117px] h-[46px] mt-8 text-xl bg-[#C2410C] rounded-md text-bold font-bold leading-[22px] text-white "
						type="submit"
					>
						Add Item
					</button>
				</div>
				{statusMessage && <p className="mt-6">{statusMessage}</p>}
			</form>
		</>
	);
}
