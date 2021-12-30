document.addEventListener('DOMContentLoaded', () => {
    getAllDogs();
    let form = document.getElementById("dog-form")
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        handleSubmit(e)
        form.reset()
    })
})
    
let dogsArray = []
let form = document.getElementById("dog-form")
let table = document.getElementById('table-body')
let dogId;

function getAllDogs(){
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => {
        dogsArray = data
        data.forEach(dog => renderDog(dog))
    })
} 

function renderDog(dog){
    
    let tr = document.createElement('tr')
    tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog['breed']}</td>
        <td>${dog.sex}</td>
        <td><button onclick = "handleEdit(${dog.id})">Edit</button></td>
    `
    document.getElementById('table-body').appendChild(tr)
}

function handleEdit(id){
    dogId = id
    let dogObj = dogsArray.find(dog => dog.id === id)
    console.log(dogObj, "fron handleEdit")
    document.querySelector('[name="name"]').value = dogObj.name
    document.querySelector('[name="breed"]').value = dogObj.breed
    document.querySelector('[name="sex"]').value = dogObj.sex
}

function handleSubmit(e){
    let newDog = dogsArray.find(dog => dog.id === dogId)
    newDog.name = e.target["name"].value
    newDog.breed = e.target["breed"].value
    newDog.sex = e.target["sex"].value

    console.log(newDog, "from Submit")
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method : "PATCH",
        headers : {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify(newDog)
    })
    .then(res => res.json())
    .then(newDog => {
        console.log('newDog submit')
        document.getElementById('table-body').innerHTML = ""
        getAllDogs()
    })
}