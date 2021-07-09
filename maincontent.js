const closeButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');


closeButtons.forEach(button => {
    button.addEventListener('click',()=>{
        const popup = button.closest('.model');
        closepopup(popup);
    })
})
function showpopup1(){
    const popup = document.querySelector("#popupmodel1");
    openpopup(popup);
}
function showpopup2(){
    const popup = document.querySelector("#popupmodel2");
    openpopup(popup);
}
function showpopup3(){
    const popup = document.querySelector("#popupmodel3");
    openpopup(popup);
}

function openpopup(popup){
    if(popup == null) return;
    setTimeout(()=>{
        popup.classList.add('active');
        overlay.classList.add('active');
    },500);
}

function closepopup(popup){
    if(popup == null) return;
    popup.classList.remove('active');
    overlay.classList.remove('active');
    getNewball(200)
}