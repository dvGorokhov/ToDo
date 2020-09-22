const sendNewToDo = document.getElementById('sendNewToDo')
newListToDo = document.getElementById('newListToDo')
const allToDo = []

function createAllToDo() {
    const newToDo = document.createElement('li')
    const newToDoName = document.createElement('input')
    const confirmBtn = document.createElement('button')

    confirmBtn.textContent = 'ok'
    confirmBtn.onclick = () => {
        if (newToDoName.value.length < 1) return
        newToDo.textContent = newToDoName.value
        const locBtn = document.createElement('button')
        locBtn.textContent = 'go to todo'
        locBtn.onclick = () => {
            location = 'file:///Users/dmitrygorokhov/Desktop/Projects/ToDo%20js/all%20todo/index.html'
        }
        newToDo.appendChild(locBtn)
    }
    newToDo.appendChild(newToDoName)
    newToDo.appendChild(confirmBtn)
    newListToDo.appendChild(newToDo)
}
sendNewToDo.onclick = () => {
    allToDo.push({
    })
    createAllToDo()
}
