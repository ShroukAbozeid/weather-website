console.log('Client side javascript file loaded')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const nameElement = document.querySelector('#location-name')
const descElement = document.querySelector('#weather-description')
const tempElement = document.querySelector('#weather-temp')
const feelslikeElement = document.querySelector('#weather-feelslike')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent defualt refersh to allow code running
    const location = searchElement.value
    nameElement.textContent = 'Loading....'
    descElement.textContent = ''
    tempElement.textContent = ''
    feelslikeElement.textContent = ''

    fetch('/weather?location=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            nameElement.textContent = data.error
        } else {
            nameElement.textContent = data.address
            descElement.textContent = data.description
            tempElement.textContent = 'temperature : ' + data.temperature
            feelslikeElement.textContent = 'feels like :' + data.feelslike
        }
    })
})
})