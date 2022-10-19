function getting_csrftoken_from_cookie(token) {

    let csrftoken = null

    if (document.cookie !== '') {

        let cookies = document.cookie.split(';')

        for (let i = 0; i < cookies.length; i++) {

            let cookie = cookies[i].trim()

            if (cookie.substring(0, token.length + 1) === (token + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(token.length + 1))
                break
            }
        }
    }
    return csrftoken
}

let csrftoken = getting_csrftoken_from_cookie('csrftoken')
let activeTask = null
let task_view_list = []

create_view()

function create_view() {

    let view = document.getElementById('view')
    let url = 'http://127.0.0.1:8000/backend/view/'

    fetch(url)
        .then((response) => response.json())
        .then(function (data) {

            console.log('Data:', data)

            for (let i in data) {

                try {
                    document.getElementById(`task-${i}`).remove()
                } catch (error) {
                    console.log('Error in create list funtion: ', error)
                }


                let task_name = `<span class="task_name">${data[i].task_name}</span>`
                let status_view = 'Not Completed'
                
                if (data[i].status == true) {
                    status_view = 'Completed'
                }

                let task = `<div id="task-${i}">
                                Task Name: ${task_name}
                                <button class="btn btn-sm edit">Edit </button>
                                <button class="btn btn-sm delete">Delete</button>
                                Status: ${status_view}
                            </div>`

                view.innerHTML += task

            }

            if (task_view_list.length > data.length) {
                for (let i = data.length; i < task_view_list.length; i++) {
                    document.getElementById(`task-${i}`).remove()
                }
            }

            task_view_list = data

            for (let i in data) {

                let task_name = document.getElementsByClassName('task_name')[i]
                let editBtn = document.getElementsByClassName('edit')[i]
                let deleteBtn = document.getElementsByClassName('delete')[i]

                task_name.addEventListener('click', (function (task) {
                    return function () {
                        statusUpdate(task)
                    }
                })(data[i]))

                editBtn.addEventListener('click', (function (task) {
                    return function () {
                        editTask(task)
                    }
                })(data[i]))


                deleteBtn.addEventListener('click', (function (task) {
                    return function () {
                        deleteTask(task)
                    }
                })(data[i]))
            }
        })
}


let form = document.getElementById('form-section')
form.addEventListener('submit', function (error) {

    error.preventDefault()
    
    console.log('Form submitted')

    let url = 'http://127.0.0.1:8000/backend/create/'

    if (activeTask != null) {
        console.log('in form : ', activeTask.id)
        url = `http://127.0.0.1:8000/backend/update/${activeTask.id}/`
        activeTask = null
    }

    let task_name = document.getElementById('task_name').value

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'task_name': task_name
        })
    }
    ).then(function (response) {
        create_view()
        document.getElementById('form').reset()
    })
})

function editTask(task) {

    console.log('Edit clicked for task: ', task)

    activeTask = task
    document.getElementById('task_name').value = activeTask.task_name
}


function deleteTask(task) {

    console.log('Delete clicked for task: ', task)

    fetch(`http://127.0.0.1:8000/backend/delete/${task.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        }
    }).then((response) => {
        create_view()
    })
}

function statusUpdate(task) {

    console.log('Strike clicked for task: ', task)

    task.status = !task.status
    fetch(`http://127.0.0.1:8000/backend/update/${task.id}/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'task_name': task.task_name,
            'status': task.status
        })
    }).then((response) => {
        create_view()
    })
}

