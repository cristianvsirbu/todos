import { useEffect, useState } from "react";
import { IoRefreshCircleOutline } from "react-icons/io5";

const URL = "https://api.quotable.io/quotes/random";

type Quote = {
	author: string;
	content: string;
};

const Quotes = () => {
	const [quote, setQuote] = useState<Quote | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function fetchQuote() {
		setError(null);

		try {
			const result = await fetch(URL);
			if (!result.ok) {
				throw new Error(`HTTP error! status: ${result.status}`);
			}
			const data = await result.json();
			setQuote(data[0]);
		} catch (e) {
			console.error(e);
			setError("Failed to fetch quote!");
		}
	}

	useEffect(() => {
		fetchQuote();
	}, []);

	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-blue-400 text-4xl font-bold">Quote of the Day</h1>
				<p className="mt-2 text-gray-600">
					Inspire yourself with motivational quotes!
				</p>
				<div className="mt-8 p-4 bg-white dark:bg-neutral-800 shadow-md rounded-lg w-full max-w-lg">
					{error && (
						<p className="text-red-500 text-2xl font-semibold">{error}</p>
					)}
					{quote && !error && (
						<>
							<p className="text-xl font-semibold dark:text-white">{quote.content}</p>
							<span className="text-sm text-gray-600 dark:text-gray-400 mt-2 float-end">
								{quote.author}
							</span>
						</>
					)}
				</div>

				<button
					onClick={() => fetchQuote()}
					className="cursor-pointer text-white mt-8 hover:scale-105 transition-transform duration-200"
				>
					<IoRefreshCircleOutline className="size-12 inline-block bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-200" />
				</button>
			</div>
		</div>
	);
};

export default Quotes;
