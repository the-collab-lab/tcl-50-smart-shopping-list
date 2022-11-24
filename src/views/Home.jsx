import { useEffect, useState } from 'react';

import './Home.css';

export function Home({ onClick, onChange, handleForm }) {
	const [token, setToken] = useState('');

	useEffect(() => {
		onChange(token);
	}, [token, onChange]);

	return (
		<div
			className="home mt-20 flex flex-col
		items-center justify-center "
		>
			<button
				onClick={onClick}
				className="create-list-btn bg-[#C2410C] text-white w-[243px] lg:w-[534px] h-[46px] lg:h-[90px]
				rounded-[10px] font-poppins font-bold text-[20px] lg:text-[32px] leading-[30px] mb-16 border border-1 border-black
				"
			>
				Create New List
			</button>

			<form onSubmit={handleForm} className="mt-20">
				<p className="mb-10 lg:mb-16 font-poppins font-bold text-[20px] lg:text-[33px] ">
					Already have a list?
				</p>
				<div className="">
					<label
						htmlFor="join-list"
						className=" font-poppins font-thin text-[15px] lg:text-[20px]"
					>
						Join an existing list
					</label>
					<br />
					<input
						value={token}
						onChange={(e) => setToken(e.target.value)}
						type="text"
						name="join-list"
						id="join-list"
						placeholder="Enter three word token"
						className="h-[45px] lg:h-[84px] w-[243px] lg:w-[534px]
						border border-black leading-[20px]
						placeholder:text-[#000000]
						lg:placeholder:text-[#777777]
						placeholder:pl-[13px]
						placeholder:text-[13px]
						lg:placeholder:text-[25px]

						placeholder:font-light
						rounded-[3px]
						"
					/>
				</div>
				<div className="text-center">
					<button
						type="submit"
						disabled={!token}
						className="bg-[#C2410C] mt-12 text-white rounded-[3px] lg:rounded-[5px] w-[117px] lg:w-[189px] h-[35px] lg:h-[68px]  text-[20px] lg:text-[29px] font-poppins border border-1 border-black "
					>
						Join
					</button>
				</div>
			</form>
		</div>
	);
}
