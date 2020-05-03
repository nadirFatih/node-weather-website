const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})


fetch('/weather?address=Boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        } else {
            console.log(data.location);
            console.log(data.forecast);
        }
        
    })
})

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.errorMessage){
            messageOne.textContent=data.errorMessage;

        } else {

            messageOne.textContent = data.location;
            messageTwo.textContent = 'Current Temp: '+ data.forecast.currentTemp + ' ' + 'Feel Like: ' + data.forecast.currentFeelLike;

        }
        
    })
})

})