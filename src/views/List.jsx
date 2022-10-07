import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{data.map((data) => (
				<ul>{ListItem(data)}</ul>
			))}
		</>
	);
}
