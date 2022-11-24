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
			return 'gray';
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
			<li className="ListItem" style={{ color: getTextColor() }}>
				<label htmlFor={item.id}>
					<input
						type="checkbox"
						aria-label={getAria()}
						id={item.id}
						checked={item.isChecked}
						onChange={handleChange}
						name={item.name}
					/>
					{item.name} - {getAria()}
				</label>
				<button onClick={() => handleDelete(listToken, item.id)}>Delete</button>
			</li>
		</>
	);
}
