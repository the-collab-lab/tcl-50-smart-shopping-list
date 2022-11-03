import { NavLink, Outlet } from 'react-router-dom';

import './Layout.css';

export function Layout({ data }) {
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
					{!data.length ? (
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
					) : null}
					{data.length ? (
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
