var list =  getCookie('todo') ||  [];
const toDoEl = $("#ft_list");
const addBtn = $("#addBtn");

const render = () => {
  const yesBtn = $('#yes-btn');
  const noBtn = $('#no-btn');
  const modal = $('#myModal');

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
    const modals = modal[0];

    toDoItem.on("click", () => {
      yesBtn.on('click', () => {
        removeTodo(index);
        modals.close();
      });

      noBtn.on('click', () => {
        modals.close();
      });

      modals.showModal();
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
  updateCookie(list);
  render();
};

const removeTodo = (index) => {
  list.splice(index, 1);
  updateCookie(list);
  render();
};

const updateCookie = (value) => {
  setCookie("toDo", value, 7);
};

const setCookie = (key, value) => {
  const encoded = encodeURI(JSON.stringify(value).replaceAll(";", "<SEMICOLON>"))
  document.cookie = `${key}=${encoded}; path=/;`
};

function getCookie(key) {
  const cookies = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');

  return cookies ? JSON.parse(decodeURI(cookies.pop()).replaceAll("<SEMICOLON>", ";")) : [];
};

addBtn.on("click", () => {
  const newTodo = prompt("New ToDo");
  if (newTodo && newTodo.trim().length > 0) {
    addTodo(newTodo);
  }
});

const oldToDo = getCookie("toDo");
if (oldToDo) {
  list = oldToDo;
}

$(document).ready(() => {
  render();
});