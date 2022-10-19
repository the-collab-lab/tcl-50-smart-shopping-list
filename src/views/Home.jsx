import { useState } from 'react';
import './Home.css';

export function Home(props) {
	const [token, setToken] = useState('');
	const { onClick } = props;

	function handleSubmit(e) {
		e.preventDefault();
		console.log(token);
	}

	return (
		<div className="Home">
			<button onClick={onClick} className="create-list-btn">
				Create a new list
			</button>

			<form onSubmit={handleSubmit}>
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
				<button type="submit">Join Shopping List</button>
			</form>
		</div>
	);
}
