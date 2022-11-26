/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,jsx,js}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				merriweather: ['Merriweather', 'sans-serif'],
			},
		},
	},
	plugins: [],
	important: true,
};
