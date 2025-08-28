import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { NavLink } from "react-router";

const ThemeToggle = () => {
	const [dark, setDark] = useState<boolean>(false);
	const toggleTheme = () => {
		setDark((prev: boolean) => !prev);
		document.body.classList.toggle("dark", !dark);
	};

	return (
		<button
			onClick={toggleTheme}
			className="cursor-pointer align-middle dark:text-white"
		>
			{dark ? <MdSunny className="size-4" /> : <FaMoon className="size-4" />}
		</button>
	);
};

const Navbar = () => {
	const activeClass = "font-bold";
	const baseClass = "hover:text-blue-500 transition-colors duration-300";
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	const getLinkClass = ({ isActive }: { isActive: boolean }) => {
		return `${isActive ? activeClass : ""} ${baseClass}`;
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			{isMobile ? (
				<div className="sticky top-0 z-1">
					<nav
						className={`h-14 flex items-center justify-between px-8 bg-white dark:bg-black
							${mobileMenuOpen ? "" : "shadow-md"}`}
					>
						<NavLink to="/">
							<img src="/vite.svg" alt="Vite logo" className="h-8" />
						</NavLink>
						<button
							className="dark:text-white"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							aria-label="Toggle navigation menu"
							aria-expanded={mobileMenuOpen}
						>
							{mobileMenuOpen ? (
								<IoClose className="size-8" />
							) : (
								<IoMenu className="size-8 " />
							)}
						</button>
					</nav>
					<AnimatePresence>
						{mobileMenuOpen && (
							<motion.ul
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
								className="flex absolute w-full items-center flex-col bg-white dark:bg-black shadow-md py-4 gap-8 dark:text-white overflow-hidden"
							>
								<motion.li
									initial={{ y: -20 }}
									animate={{ y: 0 }}
									transition={{ delay: 0.1 }}
								>
									<NavLink
										to="/"
										className={({ isActive }) => getLinkClass({ isActive })}
									>
										Home
									</NavLink>
								</motion.li>
								<motion.li
									initial={{ y: -20 }}
									animate={{ y: 0 }}
									transition={{ delay: 0.2 }}
								>
									<NavLink
										to="/todos"
										className={({ isActive }) => getLinkClass({ isActive })}
									>
										Todos
									</NavLink>
								</motion.li>
								<motion.li
									initial={{ y: -20 }}
									animate={{ y: 0 }}
									transition={{ delay: 0.3 }}
								>
									<NavLink
										to="/quotes"
										className={({ isActive }) => getLinkClass({ isActive })}
									>
										Quotes
									</NavLink>
								</motion.li>
								<motion.li
									initial={{ y: -20 }}
									animate={{ y: 0 }}
									transition={{ delay: 0.4 }}
								>
									<ThemeToggle />
								</motion.li>
							</motion.ul>
						)}
					</AnimatePresence>
				</div>
			) : (
				<nav
					className="sticky top-4 z-1 max-w-[1280px] mx-4 xl:mx-auto flex items-center justify-between px-8 bg-white dark:bg-black
		 shadow-md rounded-xl"
				>
					<NavLink to="/">
						<img src="/vite.svg" alt="Vite logo" className="h-8" />
					</NavLink>
					<ul className="flex items-center gap-8 p-4 justify-end dark:text-white">
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
						<ThemeToggle />
					</ul>
				</nav>
			)}
		</>
	);
};

export default Navbar;
