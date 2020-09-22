const input = document.getElementById('one')
const btnSend = document.getElementsByClassName('btn-success')
const listToDo = document.querySelector('.card-text')
const btnRandom = document.getElementById('random')
const btnSave = document.getElementById('save')
let toDo = []

function createList() {
    listToDo.textContent = ''
    toDo.forEach((elem, index) => {
        const newElem = document.createElement('li')
        const delElem = document.createElement('button')
        const editElem = document.createElement('button')
        const checkElem = document.createElement('input')
        const spanText = document.createElement('span')

        newElem.className = 'list-group-item'
        newElem.setAttribute('elem', index)

        spanText.setAttribute('elem', index)
        spanText.id = 'span-' + index
        spanText.textContent = elem.name

        delElem.className = 'btn-del'
        delElem.textContent = 'del'
        delElem.setAttribute('elem', index)

        editElem.className = 'btn-outline-success'
        editElem.textContent = 'edit'
        editElem.style = 'margin-left: auto'
        editElem.setAttribute('elem', index)
        editElem.setAttribute('onclick', 'edit(' + index + ',this)')

        checkElem.className = 'check'
        checkElem.type = 'checkbox'
        checkElem.checked = elem.check
        checkElem.style = 'float: left'
        checkElem.setAttribute('elem', index)
        if (elem.check) {
            spanText.classList.add('toggle')
        }
        newElem.appendChild(checkElem)
        newElem.appendChild(spanText)
        newElem.appendChild(editElem)
        newElem.appendChild(delElem)
        listToDo.appendChild(newElem)

        delElem.addEventListener('click', () => {
            toDo.splice(index, 1)
            createList()
        })
        checkElem.addEventListener('click', (e) => {
            console.log(e.target);
            toDo[e.target.getAttribute('elem')].check = e.target.checked
            spanText.classList.toggle('toggle')
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
    if ((!!input.value)) {
        toDo.push({
            name: input.value,
            check: false,
        })
        input.value = ''
        createList()
    }
})
function edit(id, editElem) {
    let span = document.getElementById('span-' + id)
    if (span.getAttribute('contentEditable') == 'true') {
        span.contentEditable = false
        editElem.textContent = 'edit'
        toDo[id].name = span.textContent
    }
    else {
        span.contentEditable = true
        editElem.textContent = 'save'
    }
};