PRIORITY = { LOW: 1, MEDIUM: 3, HIGH: 5, URGENT: 7 };

function validInteger(value) {
	// value can be a string or a number (integer)
	const regex = /^[0-9]+$/;

	const trimmedValue = String(value).trim();
	return regex.test(trimmedValue) && Number(trimmedValue) >= 0;
}

function validatePriority(priority) {
	// Convert string numbers to actual numbers if they are valid integers
	if (typeof priority === "string" && !isNaN(priority)) {
		priority = parseInt(priority, 10);
	}

	// Check for valid priority values
	if (priority === 1 || priority === 3 || priority === 5 || priority === 7) {
		return priority;
	} else {
		return 1; // Default to LOW priority for invalid inputs
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

class ToDo {
	constructor() {
		this.tasks = [];
	}

	add(task) {
		this.tasks.push(task);
		return this.tasks.length;
	}

	remove(title) {
		for (let i = 0; i < this.tasks.length; i++) {
			if (title === this.tasks[i].title) {
				this.tasks.slice(i, 1);
				return true;
			} else {
				return false;
			}
		}
	}

	list(priority = 0) {
		for (let i = 0; i < this.tasks.length; i++) {
			return `${this.tasks[i].added} ${this.tasks[i].title} ${this.tasks[i].priority},`;
		}
	}

	task(title) {
		for (let i = 0; i < this.tasks.length; i++) {
			return this.tasks[i].title;
		}
	}
}

class Task extends ToDo {
	_added;
	_title;
	_priority;

	constructor(added = todaysDate(), title, priority) {
		super();
		this._added = added;
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

task = new Task(undefined, "Get Cappuccino", PRIORITY["MEDIUM"]);
console.log(task);

// Task Example
// task = new Task("Get Cappuccino", PRIORITY["MEDIUM"]); // Creates an instance of a Task (named task)
// task.added = "30/4/2023 12:26:26"; // Checking the 'added' attribute of a Task instance returns the date/time it was added.
// task.title = "Get Cappuccino"; // Checking the 'title' attribute for a Task instance returns the title of the task.'
// task.priority = 3; // Checking the 'priority' attribute for a Task instance returns an integer 3 (Remember MEDIUM == 3).
// task.priority = PRIORITY["URGENT"]; // Setting the 'priority' attribute for a Task instance to URGENT (Remember URGENT == 7).
// task.priority = 7; // Checking the 'priority' attribute for a Task instance returns an integer 7 (Remember URGENT == 7).
// task.priority = "10"; // Setting the 'priority' attribute for a Task instance to the string '10' (an invalid priority).
// task.priority = 1; // Checking the 'priority attribute for a Task instance returns an integer 1 (because '10' was an invalid priority so it defaults to 1).

// Leave this code here for the automated tests
module.exports = {
	PRIORITY,
	validInteger,
	validatePriority,
	todaysDate,
	ToDo,
	Task,
};
