// Required variables
var session_seconds = 00;
var session_minutes = 25;

// Audio files
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

// Starting template for the timer
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function start_timer() {
  click_sound.play();

  // Change the minutes and seconds to starting time
  session_minutes = 24;
  session_seconds = 59;

  // Add the seconds and minutes to the page
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;

  // Start the countdown
  var minutes_interval = setInterval(minutesTimer, 60000);
  var seconds_interval = setInterval(secondsTimer, 1000);

  // Functions
  // Function for minute counter
  function minutesTimer() {
    session_minutes = session_minutes - 1;
    document.getElementById("minutes").innerHTML = session_minutes;
  }

  // Function for second counter
  function secondsTimer() {
    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    // Check if the seconds and minutes counter has reached 0
    // If reached 0 then end the session
    if (session_seconds <= 0) {
      if (session_minutes <= 0) {
        // Clears the interval i.e. stops the counter
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);

        // Add the message to the html
        document.getElementById("done").innerHTML =
          "Cycle Complete! Take a Break";

        // Make the html message div visible
        document.getElementById("done").classList.add("show_message");

        // PLay the bell sound to tell the end of session
        bell.play();
      }

      // Reset the session seconds to 60
      session_seconds = 60;
    }
  }
}
window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});
// Elements
const tasksList = document.querySelector("#tasks-list")
const addTaskForm = document.querySelector("form#add-task")
const addTaskInput = document.querySelector("#add-task-input")
const clearAllTasksBtn = document.querySelector("button#clear-all-tasks")

// Total List Of Tasks
let list = JSON.parse(localStorage.getItem("tasks")) || []

/**
 * Show All Tasks From Local Storage In Page
 */
function showTasksList() {
  tasksList.innerHTML = ""
  const list = JSON.parse(localStorage.getItem("tasks")) || []

  if (list.length === 0) {
    clearAllTasksBtn.disabled = true

    const element = String.raw`
			<div class="ui icon warning message">
				<i class="inbox icon"></i>
				<div class="content">
					<div class="header">You have nothing task today!</div>
					<div>Enter your tasks today above.</div>
				</div>
			</div>
		`

    tasksList.style.border = "none"
    return tasksList.insertAdjacentHTML("beforeend", element)
  }

  clearAllTasksBtn.disabled = false
  tasksList.style.border = "1px solid rgba(34,36,38,.15)"
  list.reverse().forEach(task => {
    const element = String.raw`
				<li class="ui segment grid equal width">
					<div class="ui checkbox column">
						<input type="checkbox" ${task.completed ? "checked" : ""}>
						<label>${task.text}</label>
					</div>
					<div class="column">
						<i data-id="${task.id}" class="edit outline icon"></i>
						<i data-id="${task.id}" class="trash alternate outline remove icon"></i>
					</div>
				</li>
			`

    tasksList.insertAdjacentHTML("beforeend", element)
  })

  document.querySelectorAll(`li i.edit`).forEach(item => {
    item.addEventListener("click", e => {
      e.stopPropagation()
      showEditModal(+e.target.dataset.id)
    })
  })

  document.querySelectorAll(`li i.trash`).forEach(item => {
    item.addEventListener("click", e => {
      e.stopPropagation()
      showRemoveModal(+e.target.dataset.id)
    })
  })
}

var toggle_btn;
var big_wrapper;
var hamburger_menu;

function declare() {
  toggle_btn = document.querySelector(".toggle-btn");
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

const main = document.querySelector("main");

declare();

let dark = localStorage.getItem("dark") || false;

changeDark();

function toggleAnimation() {
  dark = !dark;
  localStorage.setItem("dark", dark);
  changeDark();
}

function changeDark() {
  let clone = big_wrapper.cloneNode(true);
  if (dark) {
    clone.classList.remove("light");
    clone.classList.add("dark");
  } else {
    clone.classList.remove("dark");
    clone.classList.add("light");
  }
  clone.classList.add("copy");
  main.appendChild(clone);

  // document.body.classList.add("stop-scrolling");

  clone.addEventListener("animationend", () => {
    document.body.classList.remove("stop-scrolling");
    big_wrapper.remove();
    clone.classList.remove("copy");
    // Reset Variables
    declare();
    events();
  });
}

function events() {
  toggle_btn.addEventListener("click", toggleAnimation);
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();

function goto(url) {
  window.location.href = url;
}

