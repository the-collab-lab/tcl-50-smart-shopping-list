import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export function Home(props) {
	const { listToken, onClick } = props;
	const navigate = useNavigate();

	useEffect(() => {
		if (listToken) {
			console.log(listToken);
			navigate('/list');
		}
	}, [listToken, navigate]);

	return (
		<div className="Home">
			<button onClick={onClick} className="create-list-btn">
				Create a new list
			</button>
		</div>
	);
}
