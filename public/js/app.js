console.log('Client side javascript file loaded')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1Element = document.querySelector('#message-1')
const message2Element = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent defualt refersh to allow code running
    const location = searchElement.value
    message1Element.textContent = 'Loading....'
    message2Element.textContent = ''

    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1Element.textContent = data.error
        } else {
            message1Element.textContent = data.address
            message2Element.textContent = data.description

        }
    })
})
})