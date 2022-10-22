import { useEffect, useState } from 'react';

import './Home.css';

export function Home({ onClick, onChange, handleForm }) {
	const [token, setToken] = useState('');

	useEffect(() => {
		onChange(token);
	}, [token, onChange]);

	return (
		<div className="Home">
			<button onClick={onClick} className="create-list-btn">
				Create a new list
			</button>

			<form onSubmit={handleForm}>
				<div>
					<label htmlFor="join-list">Join an existing shopping list</label>
					<input
						value={token}
						onChange={(e) => setToken(e.target.value)}
						type="text"
						name="join-list"
						id="join-list"
					/>
				</div>
				<button type="submit" disabled={!token}>
					Join Shopping List
				</button>
			</form>
		</div>
	);
}
