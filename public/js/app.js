const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address='+ encodeURIComponent(location)).then((response) => {
        response.json().then(({ error, location, description, temperature, feelslike }) => {
            if(error)
                messageOne.textContent = error
            else {
                messageOne.textContent = location
                messageTwo.textContent = description + ". It's currently " + temperature + '°C now, and it feels like ' + feelslike + '°C'
            }
        })
    })
})