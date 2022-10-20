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

	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
	 */
	const [formToken, setFormToken] = useState('');
	// const [errorMessage, setErrorMessage] = useState('');
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
				console.log(listData);
				// setErrorMessage('this token does not exist');
				// console.log('not existing');

				// console.log(errorMessage);
				alert('this token does not exist');
			} else {
				console.log('existing');
				setListToken(formToken);
			}
		});
	}

	useEffect(() => {
		if (!listToken) return;

		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database; then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 *
			 */

			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
		});
	}, [listToken]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
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
					<Route path="/list" element={<List data={data} />} />
					<Route path="/add-item" element={<AddItem listToken={listToken} />} />
				</Route>
			</Routes>
		</Router>
	);
}
