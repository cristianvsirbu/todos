import { IoRefreshCircleOutline } from "react-icons/io5";

const Quotes = () => {
	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-blue-400 text-4xl font-bold">Quote of the Day</h1>
				<p className="mt-2 text-gray-600">
					Inspire yourself with motivational quotes!
				</p>
				<div className="mt-8 p-4 bg-white shadow-md rounded-lg w-full max-w-lg">
					<p className="text-xl font-semibold">
						"The only limit to our realization of tomorrow is our doubts of
						today."
					</p>
					<span className="text-sm text-gray-600 mt-2 float-end">
						Franklin D. Roosevelt
					</span>
				</div>

				<button className="cursor-pointer text-white mt-8 hover:scale-105 transition-transform duration-200">
					<IoRefreshCircleOutline className="size-12 inline-block bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200" />
				</button>
			</div>
		</div>
	);
};

export default Quotes;
