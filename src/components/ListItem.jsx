import './ListItem.css';
import { useEffect, useCallback } from 'react';
import { deleteItem, updateItem } from '../api/firebase';

const millisecondsIn24hrs = 86400000;

export function ListItem({ listToken, item }) {
	useEffect(() => {
		let calcDate = item.dateLastPurchased
			? item.dateLastPurchased.seconds * 1000
			: null;
		const currentDate = new Date();
		const currentTime = currentDate.getTime();
		let timer = currentTime - calcDate;

		if (item.isChecked && timer >= millisecondsIn24hrs) {
			updateItem(listToken, {
				id: item.id,
				isChecked: false,
			});
		}
	}, [item, listToken]);

	const handleChange = useCallback(async () => {
		if (!item.isChecked) {
			item.isChecked = true;
			item.totalPurchases += 1;
			await updateItem(listToken, item);
		}
	}, [listToken, item]);

	const getTextColor = () => {
		if (item?.currentEstimate <= 7) {
			return 'red';
		} else if (item?.currentEstimate > 7 && item?.currentEstimate < 30) {
			return 'green';
		} else if (item?.currentEstimate >= 30 && item?.currentEstimate <= 60) {
			return 'blue';
		} else if (item?.currentEstimate > 60) {
			return 'black';
		}
	};

	const getAria = () => {
		if (item?.currentEstimate <= 7) {
			return 'soon';
		} else if (item?.currentEstimate > 7 && item?.currentEstimate < 30) {
			return 'kind of soon';
		} else if (item?.currentEstimate >= 30 && item?.currentEstimate <= 60) {
			return 'not so soon';
		} else if (item?.currentEstimate > 60) {
			return 'inactive';
		}
	};

	const handleDelete = async (listToken, id) => {
		const isConfirmed = window.confirm(`Do you want to delete ${item.name}`);

		if (isConfirmed) {
			await deleteItem(listToken, id);
		}
	};

	return (
		<>
			<li
				className="w-full flex justify-between  items-center my-5 lg:my-10"
				style={{ color: getTextColor() }}
			>
				<label htmlFor={item.id} className="w-[75%] flex items-center gap-4">
					<input
						type="checkbox"
						aria-label={getAria()}
						id={item.id}
						checked={item.isChecked}
						onChange={handleChange}
						name={item.name}
						className="w-7 h-7 lg:w-10 lg:h-10"
					/>
					<p>
						{item.name} - <span className="text-md">{getAria()}</span>
					</p>
				</label>
				<button
					className="bg-[#ED0D0D] p-2 lg:p-5 rounded-md text-white"
					onClick={() => handleDelete(listToken, item.id)}
				>
					Delete
				</button>
			</li>
		</>
	);
}
