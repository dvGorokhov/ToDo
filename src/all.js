const sendNewToDo = document.getElementById('sendNewToDo')
const newListToDo = document.getElementById('newListToDo')
const url = 'http://localhost:3000/todos'
let allToDo = []

function addInput() {
    let newToDo = document.createElement('div')
    newToDo.classList.add('col-12')
    let newToDoName = document.createElement('input')
    newToDoName.classList.add('col-8', 'mt-3')
    let confirmBtn = document.createElement('button')
    confirmBtn.classList.add('btn', 'ml-2', 'btn-success')
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
    })
}
function openToDo(id) {
    window.location.href = 'http://localhost:8080/todos.html?id=' + id

}
function showList() {
    newListToDo.textContent = ''
    allToDo.forEach(elem => {
        let newLi = document.createElement('div')
        newLi.classList.add('col-8', 'mt-3')
        let goTo = document.createElement('button')
        newLi.textContent = elem.name
        goTo.classList.add('col-3', 'mt-3')
        goTo.textContent = 'go to ToDo'
        goTo.setAttribute('onclick', 'openToDo(' + elem.id + ')')
        newListToDo.appendChild(newLi)
        newListToDo.appendChild(goTo)
    })
}
window.onload = function () {
    getToDos()
}