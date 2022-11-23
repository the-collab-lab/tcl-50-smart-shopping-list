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

					{/* {!currentToken ? (
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
					) : null} */}

					{currentToken ? (
						<>
							<NavLink
								to="/list"
								className="Nav-link bg-orange-700  border border-black rounded-customLG text-white w-32 lg:w-48 text-2xl lg:text-4xl"
							>
								List
							</NavLink>
							<NavLink
								to="/add-item"
								className="Nav-link bg-navGreen border border-black rounded-customLG text-white  w-36 lg:w-48 text-2xl lg:text-4xl"
							>
								Add Item
							</NavLink>
						</>
					) : null}
				</nav>
			</div>
		</>
	);
}
