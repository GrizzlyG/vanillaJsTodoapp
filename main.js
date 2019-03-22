		var addTaskBtn = document.querySelector("#createTask");
		var select = document.querySelector(".time");
		var input = document.querySelector("input[type='text']");
		var duration = document.querySelector("input[type='number']");
		var ul = document.querySelector(".allTasks");
		
		window.onload = () => {
			if (localStorage.getItem("todoList")) {
				ul.innerHTML = localStorage.getItem("todoList");
			}
			
			var deleteBtns = document.querySelectorAll(".deleteTask");
			resetter();
			for (var i = 0; i < deleteBtns.length; i++) {
				deleteBtns[i].addEventListener("click", function () {
					this.parentElement.parentElement.remove()
					localStorage.setItem('todoList', ul.innerHTML);
				});
			}

			var doneBtns = document.querySelectorAll(".doneTask");
			for (var j = 0; j < doneBtns.length; j++) {
				doneBtns[j].addEventListener("click", function () {
					prompt("Are you sure");
				});
			}

		}

		//Adding new task div
		function resetter () {
			addTaskBtn.addEventListener("click", function(e) {
				e.preventDefault();
				
				var selectedTime = getSelectedOption(select).value;
				
				var listItem = document.createElement("li"),
					taskBox = document.createElement("div"),
					taskTodo = document.createElement("div"),
					deleteBtn = document.createElement("button"),
					doneBtn = document.createElement("button"),
					actionDiv = document.createElement("div");

				listItem.classList.add("task");
				taskBox.classList.add("taskBox");
				taskTodo.classList.add("taskTodo");
				deleteBtn.classList.add("actions", "deleteTask");
				doneBtn.classList.add("actions", "doneTask");

				doneBtn.innerHTML = "Done";
				deleteBtn.innerHTML = "Delete";
				
				deleteBtn.addEventListener("click", function () {
					this.parentElement.parentElement.remove()
					localStorage.setItem('todoList', ul.innerHTML);
				});
				
				doneBtn.addEventListener("click", function () {
					prompt("Are you sure");
				});
				
				
				actionDiv.append(doneBtn," ", deleteBtn);
				actionDiv.classList.add("actionDiv");

				if (input.value && duration.value && duration.value > 0) {
					taskTodo.innerHTML = input.value +" due in "+ duration.value +" "+ selectedTime;

					ul.appendChild(listItem).appendChild(taskBox).append(taskTodo,actionDiv);
					input.value = "";
					duration.value = "";

				} else {
					//replace with visual feedback
					//input.value = "";
					input.classList.add("redBorder");
					duration.classList.add("redBorder");
					setTimeout(function () {
						input.value = "";
						duration.value = "";
						input.classList.remove("redBorder");
						duration.classList.remove("redBorder");
					}, 2000);
					
					
				}

				localStorage.setItem('todoList', ul.innerHTML);

			});
		}

		function getSelectedOption(sel) {
			var opt;
			for (let i = 0; i < sel.options.length; i++) {
				opt = select.options[i];
				if (opt.selected) break
			}
			return opt;
		};