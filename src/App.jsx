import { useEffect, useState, useCallback } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { AddItem, Home, Layout, List } from './views';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';

export function App() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [formToken, setFormToken] = useState('');

	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	const handleClick = useCallback(() => {
		const newToken = generateToken();
		setListToken(newToken);
	}, [setListToken]);

	// this function handles the join shopping list form in the home page
	function handleForm(e) {
		e.preventDefault();
		streamListItems(formToken, (snapshot) => {
			const listData = getItemData(snapshot);
			if (listData?.length === 0) {
				alert('this token does not exist');
			} else {
				setListToken(formToken);
			}
		});
	}

	useEffect(() => {
		if (!listToken) return;

		return streamListItems(listToken, (snapshot) => {
			const nextData = getItemData(snapshot);

			setData(nextData);
			setIsLoading(false);
		});
	}, [listToken]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout data={data} />}>
					<Route
						index
						element={
							listToken ? (
								<Navigate to="/list" />
							) : (
								<Home
									onClick={handleClick}
									handleForm={handleForm}
									onChange={setFormToken}
								/>
							)
						}
					/>
					<Route
						path="/list"
						element={
							!listToken ? (
								<Navigate to="/" />
							) : (
								<List data={data} listToken={listToken} isLoading={isLoading} />
							)
						}
					/>
					<Route
						path="/add-item"
						element={
							!listToken ? (
								<Navigate to="/" />
							) : (
								<AddItem listToken={listToken} data={data} />
							)
						}
					/>
					<Route
						path="/add-item"
						element={<AddItem listToken={listToken} data={data} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
