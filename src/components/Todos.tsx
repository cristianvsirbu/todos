import { useMemo, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { TbTrash } from "react-icons/tb";

type Todo = {
	id: number;
	title: string;
	completed: boolean;
	dueDate: string;
	urgency: "low" | "medium" | "high";
	createdAt: Date;
};

const Todos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [todoForm, setTodoForm] = useState({
		title: "",
		dueDate: "",
		urgency: "low" as "low" | "medium" | "high",
	});
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setTodoForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const processedTodos = useMemo(() => {
		return todos
			.filter((todo) => {
				if (filter === "completed") {
					return todo.completed;
				} else if (filter === "pending") {
					return !todo.completed;
				} else {
					return true;
				}
			})
			.sort((a, b) => {
				if (sortOrder === "newest") {
					return b.createdAt.getTime() - a.createdAt.getTime();
				} else {
					return a.createdAt.getTime() - b.createdAt.getTime();
				}
			});
	}, [filter, sortOrder, todos]);

	const handleAddTodo = () => {
		if (todoForm.title && todoForm.dueDate) {
			const newTodo: Todo = {
				id: Date.now(),
				title: todoForm.title,
				completed: false,
				dueDate: todoForm.dueDate,
				urgency: todoForm.urgency,
				createdAt: new Date(),
			};
			setTodos((prev) => {
				return [...prev, newTodo];
			});
			setTodoForm({ title: "", dueDate: "", urgency: "low" });
			setIsModalOpen(false);
		}
	};

	const handleDeleteTodo = (todoId: number) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
	};

	const getUrgencyGradient = (urgency: "low" | "medium" | "high") => {
		switch (urgency) {
			case "low":
				return "bg-gradient-to-r from-white dark:from-black dark:to-green-800 dark:text-white to-green-400";
			case "medium":
				return "bg-gradient-to-r dark:from-black dark:to-yellow-800 dark:text-white from-white to-yellow-400";
			case "high":
				return "bg-gradient-to-r dark:from-black dark:to-red-800 dark:text-white from-white to-red-400";
			default:
				return "";
		}
	};

	return (
		<div className="mx-auto text-center h-full mt-16">
			<h1 className="text-green-400 text-4xl font-bold">Your Todos</h1>
			<p className="mt-2 text-gray-600 dark:text-gray-300">
				Manage your tasks efficiently!
			</p>

			{/* Filter and Sort */}
			<div className="flex items-center justify-center mt-4 gap-4">
				<select
					className="p-2 bg-white dark:bg-black dark:text-white shadow-md rounded-lg"
					onChange={(e) =>
						setFilter(e.target.value as "all" | "completed" | "pending")
					}
				>
					<option value="all">All Todos</option>
					<option value="completed">Completed</option>
					<option value="pending">Pending</option>
				</select>
				<select
					onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
					className="p-2 bg-white dark:bg-black dark:text-white shadow-md rounded-lg"
				>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
				</select>
			</div>

			{/* Todo Form Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
					<div className="bg-white mx-4 lg:mx-0 dark:bg-black dark:text-white p-6 rounded-lg shadow-lg w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
						<div>
							<label className="block mb-2">Title</label>
							<input
								type="text"
								name="title"
								value={todoForm.title}
								maxLength={50}
								required
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded-lg mb-4"
							/>
							<label className="block mb-2">Due Date</label>
							<input
								type="date"
								name="dueDate"
								min={new Date().toISOString().split("T")[0]}
								value={todoForm.dueDate}
								required
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded-lg mb-4 dark:[&::-webkit-calendar-picker-indicator]:invert"
							/>
							<label className="block mb-2">Urgency</label>
							<select
								name="urgency"
								value={todoForm.urgency}
								onChange={handleInputChange}
								className="w-full p-2 border dark:bg-black dark:text-white border-gray-300 rounded-lg mb-4"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						<div className="flex items-center justify-center gap-8">
							<button
								className="px-2 py-1 bg-red-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-75 cursor-pointer"
								onClick={() => {
									setIsModalOpen(false);
									setTodoForm({
										title: "",
										dueDate: "",
										urgency: "low",
									});
								}}
							>
								Cancel
							</button>
							<button
								disabled={!todoForm.title || !todoForm.dueDate}
								className="w-16 px-2 py-1 bg-green-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-75 cursor-pointer disabled:opacity-50"
								onClick={handleAddTodo}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Add Todo Button */}
			<button
				onClick={() => {
					setIsModalOpen(true);
					setTodoForm({ title: "", dueDate: "", urgency: "low" });
				}}
				className="cursor-pointer hover:scale-105 transition-transform duration-200"
			>
				<CgAdd className="size-12 mt-4 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors duration-200" />
			</button>

			{/* Edit Todos Button */}
			<button
				disabled={todos.length === 0}
				onClick={() => {
					setIsEditMode((prev) => !prev);
				}}
				className="cursor-pointer hover:scale-105 ml-2 transition-transform duration-200 disabled:opacity-50"
			>
				<BiPencil
					className={`size-12 p-1 mt-4 rounded-full text-white ${
						isEditMode
							? "bg-yellow-500 hover:bg-yellow-600"
							: "bg-green-500 hover:bg-green-600"
					}  transition-colors duration-200`}
				/>
			</button>

			{/* Todo List */}
			{processedTodos.length > 0 ? (
				<div className="mt-4 w-full max-w-md mx-auto text-start px-4 lg:px-0">
					{processedTodos.map((todo) => (
						<div
							key={todo.id}
							className={`mt-4 p-4 ${getUrgencyGradient(
								todo.urgency
							)}  shadow-md rounded-lg w-full max-w-md flex items-center`}
						>
							<input
								type="checkbox"
								name="todo-status"
								className="mr-4"
								checked={todo.completed}
								onChange={() => {
									setTodos((prev) => {
										return prev.map((t) =>
											t.id === todo.id ? { ...t, completed: !t.completed } : t
										);
									});
								}}
							/>
							<div>
								<p className="text-xl font-semibold">{todo.title}</p>
								<span className="text-sm text-gray-600 dark:text-gray-300">
									{todo.dueDate}
								</span>
							</div>
							<div className="ml-auto flex items-center gap-2">
								<span className="text-white font-semibold">{todo.urgency}</span>
								{isEditMode && (
									<button
										onClick={() => handleDeleteTodo(todo.id)}
										className="cursor-pointer hover:scale-105 transition-all duration-200 shadow-sm rounded-full"
									>
										<TbTrash className="size-8 p-1 text-white bg-red-500 rounded-full" />
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="mt-4 text-2xl font-bold dark:text-white">
					No Todos yet! Add one with the button above!
				</p>
			)}
		</div>
	);
};

export default Todos;
