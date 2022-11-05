import { NavLink, Outlet } from 'react-router-dom';

import './Layout.css';

export function Layout() {
	const currentToken = localStorage.getItem('tcl-shopping-list-token');

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					{/* I commented this out. It doesnt do anything for now. 
					We can decide on what happens when a  user clicks the home button */}

					{/* {!data.length ? (
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
					) : null} */}

					{currentToken ? (
						<>
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						</>
					) : null}
				</nav>
			</div>
		</>
	);
}
