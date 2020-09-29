const input = document.getElementById('one')
const btnSend = document.getElementsByClassName('btn-success')
const listToDo = document.querySelector('.card-text')
const btnRandom = document.getElementById('random')
const btnSave = document.getElementById('save')
const url = 'http://localhost:3000/ListTodos'
let toDosId = null
let toDo = []
window.onload = function () {
    getToDos()
}
function createList() {
    listToDo.textContent = ''
    toDo.forEach((elem, index) => {
        const newElem = document.createElement('li')
        const delElem = document.createElement('button')
        const editElem = document.createElement('button')
        const checkElem = document.createElement('input')
        const spanText = document.createElement('span')

        newElem.className = 'list-group-item'
        newElem.setAttribute('elem', elem.id)

        spanText.setAttribute('elem', elem.id)
        spanText.id = 'span-' + index
        spanText.textContent = elem.name

        delElem.className = 'btn-del'
        delElem.textContent = 'del'
        delElem.setAttribute('elem', index)

        editElem.className = 'btn-outline-success'
        editElem.textContent = 'edit'
        editElem.style = 'margin-left: auto'
        editElem.setAttribute('elem', elem.id)
        editElem.setAttribute('onclick', 'edit(' + index + ',this)')

        checkElem.className = 'check'
        checkElem.type = 'checkbox'
        checkElem.checked = elem.check
        checkElem.style = 'float: left'
        checkElem.setAttribute('elem', elem.id)
        if (elem.check) {
            spanText.classList.add('toggle')
        }
        newElem.appendChild(checkElem)
        newElem.appendChild(spanText)
        newElem.appendChild(editElem)
        newElem.appendChild(delElem)
        listToDo.appendChild(newElem)

        delElem.addEventListener('click', (e) => {
            fetch(url + '/' + toDo[e.target.getAttribute('elem')].id, {
                method: 'DELETE',
            }).then(response => {
                return response.json()
            }).then(data => {
                toDo.splice(e.target.getAttribute('elem'), 1)
                createList()
            }).catch(err => {
                console.error(err)
            })
        })
        checkElem.addEventListener('click', (e) => {
            fetch(url + '/' + e.target.getAttribute('elem'), {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    check: e.target.checked
                })
            }).then(response => {
                return response.json()
            }).then(data => {
                toDo[index].check = e.target.checked
                spanText.classList.toggle('toggle')
            }).catch(err => {
                console.error(err)
            })
        })
    })

}
btnRandom.addEventListener('click', () => {
    toDo = toDo.sort(function () {
        return Math.random() - 0.5;
    });
    createList()
})
btnSend[0].addEventListener('click', (e) => {
    e.preventDefault()
    if ((!input.value)) {
        return
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: input.value,
            toDosId: toDosId,
            check: false,
        })
    }).then(response => {
        return response.json()
    }).then(data => {
        toDo.push({
            name: input.value,
            toDosId: toDosId,
            check: false,
            id: data.id
        })
        console.log(data);
        input.value = ''
        createList()
    });
})
function edit(id, editElem) {
    let span = document.getElementById('span-' + id)
    if (span.getAttribute('contentEditable') == 'true') {

        fetch(url + '/' + toDo[id].id, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: span.textContent,
            })
        }).then(response => {
            return response.json()
        }).then(data => {
            span.contentEditable = false
            editElem.textContent = 'edit'
            toDo[id].name = span.textContent
        }).catch(err => {
            console.error(err)
        })
    }
    else {
        if (!toDo[id].check) {
            span.contentEditable = true
            editElem.textContent = 'save'
        }
    }
}
function getToDos() {
    toDosId = Number(window.location.search.split('=')[1])
    fetch(url + '?toDosId=' + toDosId).then(response => {
        return response.json()
    }).then(data => {
        toDo = data
        createList()
    });
}
