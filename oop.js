PRIORITY = { LOW: 1, MEDIUM: 3, HIGH: 5, URGENT: 7 };

// Function to validate if a value is a non-negative integer
const validInteger = (value) => {
	const regex = /^[0-9]+$/; // Regular expression to match non-negative integers
	const trimmedValue = String(value).trim();
	return regex.test(trimmedValue) && Number(trimmedValue) >= 0;
};

// Function to validate priority levels for tasks
const validatePriority = (priority) => {
	const validPriorityLevels = [1, 3, 5, 7];
	// If priority is a string that can be converted to a number, parse it
	const parsedPriority = typeof priority === "string" && !isNaN(priority) ? parseInt(priority, 10) : priority;

	return validPriorityLevels.includes(parsedPriority) ? parsedPriority : 1;
};

// Function to get the current date and time formatted as a string
const todaysDate = () => {
	const currentDate = new Date();

	// Helper function to pad single-digit numbers with leading zeros
	const pad = (num) => String(num).padStart(2, "0");

	const day = pad(currentDate.getDate());
	const month = pad(currentDate.getMonth() + 1); // Months are zero-indexed
	const year = currentDate.getFullYear();
	const hours = pad(currentDate.getHours());
	const minutes = pad(currentDate.getMinutes());
	const seconds = pad(currentDate.getSeconds());

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Class representing a single task
class Task {
	#added;
	#title;
	#priority;

	constructor(title, priority) {
		this.#added = todaysDate();
		this.#title = title;
		this.#priority = validatePriority(priority);
	}

	get added() {
		return this.#added;
	}

	get title() {
		return this.#title;
	}

	get priority() {
		return this.#priority;
	}

	set priority(newPriority) {
		this.#priority = validatePriority(newPriority);
	}
}

// Class representing a to-do list
class ToDo {
	constructor() {
		this.tasks = [];
	}

	// Method to add a task to the list
	add(task) {
		this.tasks.push(task);
		return this.tasks.length;
	}

	// Method to remove a task by its title
	remove(title) {
		const index = this.tasks.findIndex((task) => task.title.toLowerCase() === title.toLowerCase()); // Find the index of the task
		if (index !== -1) {
			this.tasks.splice(index, 1); // Remove the task if found
			return true;
		}
		return false;
	}

	// Method to list tasks, filtering by priority
	list(priority = 0) {
		const newList = this.tasks
			.filter((task) => priority === 0 || task.priority === priority) // Filter tasks by priority
			.map((task) => [task.added, task.title, task.priority]); // Create an array of task details
		return newList;
	}

	// Method to find and return a task by its title
	task(title) {
		const foundTask = this.tasks.find((task) => task.title.toLowerCase() === title.toLowerCase()); // Search for the task
		if (!foundTask) {
			throw new Error(`Task '${title}' Not Found`);
		}
		return foundTask;
	}
}

// Leave this code here for the automated tests
module.exports = {
	PRIORITY,
	validInteger,
	validatePriority,
	todaysDate,
	ToDo,
	Task,
};
