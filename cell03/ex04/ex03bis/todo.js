let list = [];
const toDoEl = $("#ft_list");
const addBtn = $("#addBtn");

const render = () => {
  toDoEl.empty();
  if (!list.length) {
    const empty_list = $("<div></div>")
      .text("No ToDos")
      .css({
        "font-size": "20px",
        "text-align": "center",
      })
      .addClass("emptyMessage");
    toDoEl.append(empty_list);
    return;
  }

  list.forEach((value, index) => {
    const toDoItem = createTodoElement(value);
    toDoItem.on("click", () => {
      removeTodo(index);
    });
    toDoEl.append(toDoItem);
  });
};

const createTodoElement = (value) => {
  const button = $("<button></button>").addClass("todoItem").text(value);
  return button;
};

const addTodo = (value) => {
  list.push(value);
  updateCookie(JSON.stringify(list));
  render();
};

const removeTodo = (index) => {
  list.splice(index, 1);
  updateCookie(JSON.stringify(list));
  render();
};

const updateCookie = (value) => {
  setCookie("toDo", value, 7);
};

const setCookie = (key, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${key}=${value};${expires};path=/`;
};

const getCookie = (key) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(key + "=")) {
      return cookie.substring(key.length + 1);
    }
  }
  return null;
};

addBtn.on("click", () => {
  const newTodo = prompt("New ToDo");
  if (newTodo && newTodo.trim().length > 0) {
    addTodo(newTodo);
  }
});

const oldToDo = getCookie("toDo");
if (oldToDo) {
  list = JSON.parse(oldToDo);
}

$(document).ready(() => {
  render();
});