document.addEventListener('DOMContentLoaded', function() {
    load_list();
});

var button = document.getElementById('new');

button.addEventListener('click', function() {
    var new_task = prompt('Please enter your task:');

    if (new_task !== null && new_task.trim() !== '') {
        var list = document.getElementById('list');
        var li = document.createElement('li');
        li.innerHTML = new_task + ' <button onclick="remove_list(this)">X</button>';
        var top_list = list.firstChild;
        list.insertBefore(li, top_list);
        save_list();
    }
});

function remove_list(button) {
    var li = button.parentNode;
    var list = document.getElementById('list');
    list.removeChild(li);
    save_list();
}

function save_list() {
    var list = document.getElementById('list').innerHTML;
    setCookie('list', list, 7);
}

function load_list() {
    var saved_list = getCookie('list');
    if (saved_list) {
        document.getElementById('list').innerHTML = saved_list;
        var buttons = document.querySelectorAll('li button');
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                remove_list(button);
            });
        });
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}