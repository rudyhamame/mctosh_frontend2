import React, { useState, useEffect } from "react";

const HomeContentTodo = () => {
  const getData = () => {
    const url = "https://backendstep1.herokuapp.com/api/Todo";
    let req = new Request(url, { method: "GET", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })

      .then((jsonData) => {
        document.getElementById("task_todo").innerHTML = "";
        document.getElementById("deadline_todo").innerHTML = "";
        document.getElementById("status_todo").innerHTML = "";
        document.getElementById("tools").innerHTML = "";
        for (var i = 0; i < jsonData.length; i++) {
          //........................................p....................................

          let task_p = document.createElement("p");
          let deadline_p = document.createElement("p");
          let status_p = document.createElement("p");

          task_p.setAttribute("id", "task_column_p" + i);
          deadline_p.setAttribute("id", "deadline_column_p" + i);
          status_p.setAttribute("id", "status_column_p" + i);

          task_p.textContent = jsonData[i].task;
          status_p.textContent = jsonData[i].status;

          let date = new Date();
          deadline_p.textContent =
            date.getDate(jsonData[i].deadline) +
            "/" +
            date.getMonth(jsonData[i].deadline) +
            "/" +
            date.getFullYear(jsonData[i].deadline) +
            "  :  " +
            date.getHours(jsonData[i].deadline) +
            ":" +
            date.getMinutes(jsonData[i].deadline);

          //........................................li....................................
          let task_li = document.createElement("li");
          let deadline_li = document.createElement("li");
          let status_li = document.createElement("li");

          task_li.setAttribute("id", "task_column_li" + i);
          deadline_li.setAttribute("id", "deadline_column_li" + i);
          status_li.setAttribute("id", "status_column_li" + i);

          task_li.appendChild(task_p);
          deadline_li.appendChild(deadline_p);
          status_li.appendChild(status_p);

          let task_todo_ul = document.getElementById("task_todo");
          let deadline_todo_ul = document.getElementById("deadline_todo");
          let status_todo_ul = document.getElementById("status_todo");

          task_todo_ul.appendChild(task_li);
          deadline_todo_ul.appendChild(deadline_li);
          status_todo_ul.appendChild(status_li);

          //........................................delete/edit icons....................................

          let divIcons = document.createElement("div");
          let deleteIcon = document.createElement("i");
          let editIcon = document.createElement("i");

          divIcons.setAttribute("id", String(jsonData[i]._id));
          divIcons.setAttribute("class", "div_icons");

          deleteIcon.setAttribute("id", "todo_edit" + i);
          editIcon.setAttribute("id", "todo_edit" + i);
          editIcon.setAttribute("class", "fas fa-edit");
          deleteIcon.setAttribute("class", "fas fa-eraser");
          editIcon.addEventListener("click", () => putData(editIcon.id));
          deleteIcon.addEventListener("click", () => deleteData(deleteIcon.id));

          divIcons.appendChild(deleteIcon);
          divIcons.appendChild(editIcon);
          let tools_ul = document.getElementById("tools");
          tools_ul.appendChild(divIcons);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };
  function postData(event) {
    event.preventDefault();
    let task_input = document.getElementById("task_input");
    let deadline_input = document.getElementById("deadline_input");
    let status_input = document.getElementById("status_input");

    let url = "https://backendstep1.herokuapp.com/api/Todo";
    let options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        task: task_input.value,
        deadline: deadline_input.value,
        status: status_input.value,
      }), // body data type must match "Content-Type" header
    };
    task_input.value = "";
    deadline_input.value = "";
    status_input.value = "";

    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  }
  function putData(id) {
    let targetID = document.getElementById(id).parentElement.id;
    let task_input = document.getElementById("task_input");
    let deadline_input = document.getElementById("deadline_input");
    let status_input = document.getElementById("status_input");

    let url = "https://backendstep1.herokuapp.com/api/Todo/" + targetID;
    let options = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        task: task_input.value,
        deadline: deadline_input.value,
        status: status_input.value,
      }), // body data type must match "Content-Type" header
    };
    task_input.value = "";
    deadline_input.value = "";
    status_input.value = "";

    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  }

  function deleteData(id) {
    let targetID = document.getElementById(id).parentElement.id;
    const url = "https://backendstep1.herokuapp.com/api/Todo/" + targetID;
    let req = new Request(url, { method: "DELETE", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      });
  }
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getData();
  });

  return (
    <div id="home_content_div">
      <section id="todo_table">
        <div>
          <h3>Task</h3>
          <ul id="task_todo"></ul>
        </div>
        <hr />
        <div>
          <h3>Deadline</h3>
          <ul id="deadline_todo"></ul>
        </div>
        <hr />

        <div>
          <h3>Status</h3>
          <ul id="status_todo"></ul>
        </div>
        <div>
          <h3 style={{ color: "var(--white)" }}>.</h3>
          <ul id="tools"></ul>
        </div>
      </section>
      <section id="todo_table_form">
        <form id="input_form_todo" action="">
          <input type="text" name="task_input" id="task_input" />
          <input type="text" name="status_input" id="status_input" />
          <input type="date" name="deadline_input" id="deadline_input" />
          <i id="submit_icon" onClick={postData} class="fas fa-paper-plane"></i>
        </form>
      </section>
    </div>
  );
};

export default HomeContentTodo;