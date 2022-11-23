/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,jsx,js}'],
	theme: {
		extend: {
			colors: {
				navGreen: '#0CC296',
			},
			borderRadius: {
				customLG: '3px',
			},
		},
	},
	plugins: [],
};
