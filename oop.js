PRIORITY = { LOW: 1, MEDIUM: 3, HIGH: 5, URGENT: 7 };

function validInteger(value) {
	// value can be a string or a number (integer)
	const regex = /^[0-9]+$/;

	const trimmedValue = String(value).trim();
	return regex.test(trimmedValue) && Number(trimmedValue) >= 0;
}

function validatePriority(priority) {
	if (typeof priority === "string" && !isNaN(priority)) {
		priority = parseInt(priority, 10);
	}

	if (priority === 1 || priority === 3 || priority === 5 || priority === 7) {
		return priority;
	} else {
		return 1;
	}
}

function todaysDate() {
	const currentDate = new Date();

	const day = String(currentDate.getDate()).padStart(2, "0");
	const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
	const year = String(currentDate.getFullYear());
	const hours = String(currentDate.getHours()).padStart(2, "0");
	const minutes = String(currentDate.getMinutes()).padStart(2, "0");
	const seconds = String(currentDate.getSeconds()).padStart(2, "0");

	return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

class Task {
	_added;
	_title;
	_priority;

	constructor(title, priority) {
		this._added = todaysDate();
		this._title = title;
		this._priority = validatePriority(priority);
	}

	get added() {
		return this._added;
	}

	get title() {
		return this._title;
	}

	get priority() {
		return this._priority;
	}

	set priority(priority) {
		this._priority = validatePriority(priority);
	}
}

class ToDo {
	constructor() {
		this.tasks = [];
	}

	add(task) {
		this.tasks.push(task);
		return this.tasks.length;
	}

	remove(title) {
		const index = this.tasks.findIndex((task) => task.title.toLowerCase() === title.toLowerCase());
		if (index !== -1) {
			this.tasks.splice(index, 1);
			return true;
		}
		return false;
	}

	list(priority = 0) {
		return this.tasks
			.filter((task) => priority === 0 || task.priority === priority)
			.map((task) => [task.added, task.title, task.priority]);
	}

	task(title) {
		const foundTask = this.tasks.find((task) => task.title.toLowerCase() === title.toLowerCase());
		if (!foundTask) throw new Error(`Task '${title}' Not Found`);
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
