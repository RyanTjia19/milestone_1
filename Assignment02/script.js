//Different list to add the task to
var lowTasks = [];
var medTasks = [];
var highTasks = [];

//Dictionary to keep track of the amount of pending tasks
const dictionary = {'high' : 0, 'med' : 0, 'low' : 0};

//This will keep track of the task number overall, mainly used
//to link the button to the correct task to see a collapsed div
//of the task's description
var taskNumber = 0;

//This function is used to allow addEventListener to work on a separate file
window.onload = function() {

	//Checks to see if the user clicks any where on the screen
	document.addEventListener('click', function(event) {

		//Store the target of what was clicked
		element = event.target;

		//Check to see if it's the 'remove' button
		if (element.className == 'remove') {

			//Temporarily store the task element
			var taskElement = element.parentElement;

			//Temporarily get the id of the parent list
			var parentList = taskElement.parentElement.id;

			//Remove the parent element, which also remove the button clicked
			taskElement.remove();

			//Remove the task from the respective array as well
			//This is done by adding tasks that are not to be removed onto
			//the empty array that has the same name as the old array
			if (parentList == 'high') {
				highTasks = highTasks.filter(object => {
					return object.Title !== taskElement.children[0].innerHTML;
				})
			}

			else if (parentList == 'med') {
				medTasks = medTasks.filter(object => {
					return object.Title !== taskElement.children[0].innerHTML;
				})
			}

			else if (parentList == 'low') {
				lowTasks = lowTasks.filter(object => {
					return object.Title !== taskElement.children[0].innerHTML;
				})
			}

			//Updates the count, but if it's already completed then don't
			//update count
			if (taskElement.querySelector(".complete") != null) {
				dictionary[parentList] = dictionary[parentList] - 1;
				document.getElementById(`${parentList}-title`).innerHTML =
					dictionary[parentList];
			}
		}

		//Check to see if it's the 'complete' button
		else if (element.className == 'complete') {

			//Temporarily store the 'task' and 'status' elements respectively
			var taskElement = element.parentElement.children[0];
			var statusElement = element.parentElement.children[2].children[0];

			//Temporarily get the id of the parent list
			var parentList = element.parentElement.parentElement.id;

			//Updates the text of the task
			taskElement.style.textDecoration = "line-through";
			statusElement.innerHTML = "complete"

			//Remove the complete button
			element.remove();

			//Updates the count
			dictionary[parentList] = dictionary[parentList] - 1;
			document.getElementById(`${parentList}-title`).innerHTML =
				dictionary[parentList];

			//Moves the recently completed task to the bottom of the respective 'ul'
			document.getElementById(parentList).appendChild(taskElement.parentElement);
		}
	})
}

function AddTask() {

	//Creates an object for the new task
	const newTask = new Object();

	//Gets the correct value
	newTask.Title = document.getElementById("title").value;
	newTask.Desc = document.getElementById("desc").value;

	//Default value
	newTask.Priority = '';

	//Finding the checked value
	priority = document.getElementsByName("priority");
	for (var button of priority) {
		if (button.checked) {
			newTask.Priority = button.value;
		}
	}

	//Lets the user know that they must pick a priority
	if (newTask.Priority == '') {
		alert("Must pick a priority");
	}

	//Adds the new task
	else {

		//Resets the inputs
		document.getElementById("title").value = '';
		document.getElementById("desc").value = '';
		
		for (var button of priority) {
			button.checked = false;
		}

		//Adds the task to the respective array
		//Did not use the '===' operator as it is already
		//known that the value will always be a string
		if (newTask.Priority == 'high') {
			highTasks.push(newTask);
		}

		else if (newTask.Priority == 'med') {
			medTasks.push(newTask);
		}

		else if (newTask.Priority == 'low') {
			lowTasks.push(newTask);
		}

		//Creates a new element of type "li"
		const child = document.createElement("li");

		//Adds the button along with the title of the task
		Task = `<span>${newTask.Title}</span>
					<span> - </span>
					<span><i>pending</i></span>
					<button class="complete">Complete</button>
					<button class="remove">Remove</button>
					<button id="collapsable" data-toggle="collapse" data-target=#w${taskNumber}>
					...
					</button>
					<div class="collapse list-desc" id=w${taskNumber}>${newTask.Desc}</div>`;

		child.innerHTML = Task;

		//Adds this new element onto the 'ul', depending on its priority
		//Puts it at the top of the list since it's recently added
		const ulList = document.getElementById(newTask.Priority);
		ulList.insertBefore(child, ulList.firstChild);

		//Updates the count
		dictionary[newTask.Priority] = dictionary[newTask.Priority] + 1;
		taskNumber = taskNumber + 1;
		document.getElementById(`${newTask.Priority}-title`).innerHTML =
			dictionary[newTask.Priority];
	}

	return false;
}