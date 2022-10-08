import { ListItem } from '../components';

export default function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item) => (
					<ListItem name={item.name} key={item.id} />
				))}
			</ul>
		</>
	);
}
