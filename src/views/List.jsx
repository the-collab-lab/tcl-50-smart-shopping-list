import { ListItem } from '../components';

export function List({ data }) {
	const list = data.map((listItem) => (
		<li key={listItem.id}>{listItem.name}</li>
	));
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>{list}</ul>
		</>
	);
}
