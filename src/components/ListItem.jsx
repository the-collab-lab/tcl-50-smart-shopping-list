import './ListItem.css';

export default function ListItem({ name }) {
	return (
		<>
			<li className="ListItem"> {name}</li>;
		</>
	);
}
