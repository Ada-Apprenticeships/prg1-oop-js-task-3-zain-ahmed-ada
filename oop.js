PRIORITY = { LOW: 1, MEDIUM: 3, HIGH: 5, URGENT: 7 };

function validInteger(value) {
	// value can be a string or a number (integer)
	if (typeof value === "number") {
		return true;
	} else {
		return false;
	}
}

function validatePriority(priority) {
	if (priority === 1 || priority === "LOW") {
		return 1;
	} else if (priority === 2 || priority === "MEDIUM") {
		return 3;
	} else if (priority === 5 || priority === "HIGH") {
		return 5;
	} else if (priority === 7 || priority === "URGENT") {
		return 7;
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

	constructor(added, title, priority) {
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

// Task Example
task = new Task("Get Cappuccino", PRIORITY["MEDIUM"]); // Creates an instance of a Task (named task)
task.added = "30/4/2023 12:26:26"; // Checking the 'added' attribute of a Task instance returns the date/time it was added.
task.title = "Get Cappuccino"; // Checking the 'title' attribute for a Task instance returns the title of the task.'
task.priority = 3; // Checking the 'priority' attribute for a Task instance returns an integer 3 (Remember MEDIUM == 3).
task.priority = PRIORITY["URGENT"]; // Setting the 'priority' attribute for a Task instance to URGENT (Remember URGENT == 7).
task.priority = 7; // Checking the 'priority' attribute for a Task instance returns an integer 7 (Remember URGENT == 7).
task.priority = "10"; // Setting the 'priority' attribute for a Task instance to the string '10' (an invalid priority).
task.priority = 1; // Checking the 'priority attribute for a Task instance returns an integer 1 (because '10' was an invalid priority so it defaults to 1).

// Leave this code here for the automated tests
module.exports = {
	PRIORITY,
	validInteger,
	validatePriority,
	todaysDate,
	ToDo,
	Task,
};
