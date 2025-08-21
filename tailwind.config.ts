import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [],
};

export default config;
