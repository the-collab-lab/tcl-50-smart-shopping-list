import './Home.css';

export function Home(props) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={props.handleClick} className="create-list-btn">
				Create a new list
			</button>
		</div>
	);
}
