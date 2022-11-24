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
				<nav className="Nav mb-8">
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
								className="Nav-link bg-orange-700  border border-black rounded-[3px] text-white w-[81px] lg:w-[122px] h-[35px] lg:h-[76px] text-[14px] lg:text-[20px] lg:leading-[50px] font-bold font-poppins"
							>
								List
							</NavLink>
							<NavLink
								to="/add-item"
								className="Nav-link bg-[#0CC296] border border-black rounded-[3px] text-white  w-[81px] lg:w-[122.35px]  h-[35px] lg:h-[76px] text-[14px] lg:text-[20px] lg:leading-[50px] font-bold font-poppins"
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
