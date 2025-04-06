
function isOn(){
isClicked=!isClicked;
return isClicked;
}

function showMenu(dmenu){
dmenu.classList.remove('js-menu-animate-hide');
dmenu.classList.add('js-menu-show');

}

function hideMenu(dmenu){

dmenu.classList.add('js-menu-animate-hide');
timer=setTimeout(function(){
  dmenu.classList.remove('js-menu-show');
}, 950)

}

function toggleMainMenu(){
isClicked=false;
menu=document.querySelector('.menu');
dmenu=document.querySelector('.d-menu');
dashboard=document.querySelector('.dashboard');
menu.addEventListener('click',function(){
dashboard.classList.toggle('js-d-content');
if(isOn()){
showMenu(dmenu);
}else{
hideMenu(dmenu);
}

});

}

function toggleSubMenu(){
isToggle=false;
caret=document.querySelector("#caret");
caret.addEventListener('click',function(e){
e.preventDefault();
sub=document.querySelector('.d-menu ul ul');
sub_li=document.querySelector('.d-menu .sub-menu');
if(isToggle){
  sub.style.display="flex";
  dmenu.classList.add('sub-menu');
  caret.className="fa fa-caret-down";
}else{
  sub.style.display="none";
  caret.className="fa fa-caret-right";
}

isToggle=!isToggle;

});

}
function allowContentScroll(){
isOut=false;
dcontent=document.querySelector('.d-content');
menu=document.querySelector('.menu');
dcontent.addEventListener('click',function(){
if(window.outerWidth>870){
  if(!isOut)
    {
    isOut=menu.click();
    isOut=!isOut;

    }
}
  });
}
function showMenuOnStart(){
  isOpen=false;
  if(this.window.outerWidth>770){
    if(!isOpen)
    {
    isOpen=menu.click();
    isOpen=!isOpen;

    }
  }

}


function changeTheme(){
theme=document.querySelector('.theme');
tMenu=document.querySelector('.t-menu');
dFooter=document.querySelector('.d-content-f');
theme.addEventListener('click',function(e){
e.preventDefault();

tMenu.classList.toggle('js-theme');
dFooter.classList.toggle('js-theme');
})
}

window.addEventListener('DOMContentLoaded',function(){

toggleMainMenu();
toggleSubMenu();
//changeTheme();
//showMenuOnStart();
//allowContentScroll();
})


