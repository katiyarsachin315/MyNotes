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
 
    container.innerHTML += `<div class="card">
    <h2>${data.codeTitle}</h2>
    <button class="viewBtn"  noteId=${data.id} >View</button>
  </div>`

  let allViewBtn = document.querySelectorAll(".viewBtn");
    for(let i=0;i<allViewBtn.length;i++){
    allViewBtn[i].addEventListener("click",viewCard);
}
}


function viewCard(){
    let searchBar = document.querySelector(".searchBar");
    searchBar.value='';
    container.innerHTML = "";
    for(let i=0;i<myArr.length;i++){
        createCards(myArr[i]);
    }
    let noteId = parseInt(this.getAttribute("noteId"));
    let title = document.querySelector(".codeHeader h2");
    let codeViewer = document.querySelector(".codeText textarea");
    let codeViewerCont = document.querySelector(".codeViewer");
    let filterArr = myArr.filter(f=>f.id == noteId);
    codeViewer.value = filterArr[0].code;
    title.innerText = filterArr[0].codeTitle;
    codeViewerCont.style.width = "0%";
    setTimeout(()=>{

        codeViewerCont.style.width = "35%";
    },100)

}


function copyData(){
    let copyBtn = document.querySelector(".copyBtn");
    let codeViewer = document.querySelector(".codeText textarea");
    navigator.clipboard.writeText(codeViewer.value);

}

function closeBtn(){
    let codeViewerCont = document.querySelector(".codeViewer");
    codeViewerCont.style.width = "0%";
}

let searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("input",(e)=>handleSearch(e))

function handleSearch(e){
    let myText = e.target.value;
    let filterArr = myArr.filter(f=>(f.codeTitle.toLowerCase()).includes(myText.toLowerCase()));
    container.innerHTML = "";
    for(let i=0;i<filterArr.length;i++){
        createCards(filterArr[i]);
    }
}

