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
				<nav className="Nav mb-8">
					{currentToken ? (
						<>
							<NavLink
								to="/list"
								className="Nav-link bg-orange-700 w-60 h-18 border border-black rounded-[3px] text-white lg:leading-[20px] text-[14px] lg:text-[16px] font-bold font-poppins"
							>
								List
							</NavLink>
							<NavLink
								to="/add-item"
								className="Nav-link bg-[#0CC296] w-60 h-18 border border-black rounded-[3px] text-white text-[14px] lg:text-[16px] lg:leading-[20px] font-bold font-poppins"
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
