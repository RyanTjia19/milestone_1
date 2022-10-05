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
		}
	})
}

function AddTask() {

	//Gets the correct value
	taskTitle = document.getElementById("title").value;
	taskDesc = document.getElementById("desc").value;

	//Default value
	taskPriority = '';

	//Finding the checked value
	priority = document.getElementsByName("priority");
	for (var button of priority) {
		if (button.checked) {
			taskPriority = button.value;
		}
	}

	//Lets the user know that they must pick a priority
	if (taskPriority == '') {
		alert("Must pick a priority");
	}

	//Adds the new task
	else {
		document.getElementById("title").value = '';
		document.getElementById("desc").value = '';
		
		for (var button of priority) {
			button.checked = false;
		}

		//Creates a new element of type "li"
		const child = document.createElement("li");

		//Adds the button along with the title of the task
		newTask = `<span>${taskTitle}</span>
					<span> - </span>
					<span><i>pending</i></span>
					<button class="complete">Complete</button>
					<button class="remove">Remove</button>
					<button data-toggle="collapse" data-target=#w${taskNumber}>
					...
					</button>
					<div class="collapse" id=w${taskNumber}>${taskDesc}</div>`;

		child.innerHTML = newTask;

		//Adds this new element onto the 'ul', depending on its priority
		document.getElementById(taskPriority).appendChild(child);

		//Updates the count
		dictionary[taskPriority] = dictionary[taskPriority] + 1;
		taskNumber = taskNumber + 1;
		document.getElementById(`${taskPriority}-title`).innerHTML =
			dictionary[taskPriority];
	}

	return false;
}