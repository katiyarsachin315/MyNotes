let myArr = [];


async function fetchData() {
    const response = await fetch('https://mynotes-391817-default-rtdb.firebaseio.com/myNotes.json');
    const data = await response.json();
    return data;
}

fetchData().then(data => {
    for (let i in data) {
        myArr.push(data[i]);
    }
    // myArr.pop()
    for (let i = 0; i < myArr.length; i++) {
        createCards(myArr[i]);
    }
});


let container = document.querySelector(".container");

function createCards(data) {
    console.log(data);
    container.innerHTML += `<div class="card">
    <h2>${data.codeTitle}</h2>
    <button class="viewBtn" noteId=${data.id} >View</button>
  </div>`
}


