import { NavLink } from "react-router";

const Navbar = () => {
	const activeClass = "font-bold";
	const baseClass = "hover:text-blue-500 transition-colors duration-300";

	const getLinkClass = ({ isActive }: { isActive: boolean }) => {
		return `${isActive ? activeClass : ""} ${baseClass}`;
	};

	return (
		<nav className="sticky top-4 z-1 max-w-[1280px] mx-auto flex items-center justify-between px-16 bg-white shadow-md rounded-xl">
			<NavLink to="/">
				<img src="/vite.svg" alt="Vite logo" className="h-8" />
			</NavLink>
			<ul className="flex items-center gap-8 p-4 justify-end">
				<li>
					<NavLink
						to="/"
						className={({ isActive }) => getLinkClass({ isActive })}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/todos"
						className={({ isActive }) => getLinkClass({ isActive })}
					>
						Todos
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/quotes"
						className={({ isActive }) => getLinkClass({ isActive })}
					>
						Quotes
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
