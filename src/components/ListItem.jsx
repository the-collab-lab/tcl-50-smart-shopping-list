import './ListItem.css';

export function ListItem({ name, id }) {
	return (
		<>
			<li className="ListItem">
				<label htmlFor={id}>
					<input type="checkbox" id={id} /> {name}
				</label>
			</li>
		</>
	);
}
