import './Home.css';

export function Home(props) {
	const { onClick } = props;

	return (
		<div className="Home">
			<button onClick={onClick} className="create-list-btn">
				Create a new list
			</button>
		</div>
	);
}
