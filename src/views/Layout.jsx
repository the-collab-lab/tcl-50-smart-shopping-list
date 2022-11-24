import { NavLink, Outlet } from 'react-router-dom';

import './Layout.css';

export function Layout() {
	const currentToken = localStorage.getItem('tcl-shopping-list-token');

	return (
		<>
			<div className="Layout">
				<header className="Layout-header text-[28px]  font-bold leading-[48px] top-16 mb-16 font-poppins">
					<h1>
						Smart{' '}
						<span className="lg:hidden">
							<br />{' '}
						</span>{' '}
						Shopping List
					</h1>
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
