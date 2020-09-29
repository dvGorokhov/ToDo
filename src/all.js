const sendNewToDo = document.getElementById('sendNewToDo')
const newListToDo = document.getElementById('newListToDo')
const url = 'http://localhost:3000/todos'
let allToDo = []

function addInput() {
    let newToDo = document.createElement('li')
    let newToDoName = document.createElement('input')
    let confirmBtn = document.createElement('button')

    if (document.getElementById('newName')) {
        return
    }
    newToDoName.id = 'newName'
    confirmBtn.textContent = 'ok'
    confirmBtn.setAttribute('onclick', 'okBtn()')

    newToDo.appendChild(newToDoName)
    newToDo.appendChild(confirmBtn)
    newListToDo.appendChild(newToDo)
}
function okBtn() {
    let newName = document.getElementById('newName').value
    if (newName.length < 1) {
        return
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    }).then(response => {
        return response.json()
    }).then(data => {
        allToDo.push({
            name: newName,
            id: data.id
        })
        showList()
        console.log(data);
    });
}
function addNewNameToDo() {
    let newName = document.getElementById('newName').value
    allToDo.push({
        name: newName
    })
    createAllToDo()
}
function getToDos() {
    fetch(url).then(response => {
        return response.json()
    }).then(data => {
        allToDo = data
        showList()
        console.log(allToDo);
    });
}
function openToDo(id) {
    window.location.href = 'file:///Users/dmitrygorokhov/Desktop/Projects/ToDo_js/src/index.html?id=' + id
}
function showList() {
    newListToDo.textContent = ''
    allToDo.forEach(elem => {
        let newLi = document.createElement('li')
        let goTo = document.createElement('button')
        newLi.textContent = elem.name
        goTo.textContent = 'go to ToDo'
        goTo.setAttribute('onclick', 'openToDo(' + elem.id + ')')
        newLi.appendChild(goTo)
        newListToDo.appendChild(newLi)
    })
}
window.onload = function () {
    getToDos()
}