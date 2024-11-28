'use strict';
let skills = {
    sortMode:null,
    data : null,
    dataloaded:false,
    getComparator(prop){
        return (a,b) => a[prop]>b[prop] ? 1 : a[prop]<b[prop] ? -1:0
    },
    sortList(type){
        if(this.sortMode!=type) {
            this.data.sort(this.getComparator(type));
            console.log(`ОТСОРТИРОВАЛИ ПО ${type}`);
        }
        else{
            this.data.reverse();
            console.log(`ИНВЕРТИРОВАЛИ ПО ${type}`);
        } 
        this.sortMode=type;
        
    },
    async generateList(parentElement){
        parentElement.innerHTML="";
        try{
            if(this.data===null)await this.getData();
            this.data.forEach(elem => {
                let dt = document.createElement('dt');
                dt.classList.add(elem.class, 'skill-item');
                dt.textContent=elem.name;
                dt.style.backgroundImage=`url('./img/skill_${elem.iconName}')`;
                let dd = document.createElement('dd');
                dd.classList.add('skill-level');
                let div = document.createElement('div');
                div.textContent=`${elem.level}%`;
                div.style.width=div.textContent;
                dd.appendChild(div);
                parentElement.appendChild(dt);
                parentElement.appendChild(dd);
            });
        }
        catch(e){
            document.querySelector(".skills-sort").style.display='none';
            let newElement = document.createElement('p');
            let newButton = document.createElement('button');
            newElement.textContent="Извините, данные не загрузились"
            newButton.onclick=()=>{this.generateList(document.querySelector('dl.skill-list'))};
            newButton.textContent="Перезагрузить"
            parentElement.appendChild(newElement)
            parentElement.appendChild(newButton)
        }
        return parentElement;
    },
    async getData(){
        this.data = await (await fetch("../db/skills.json")).json()
    }

}
let menu = {
    opened:true,
    nav:null,
    btn:null,
    init(navig,button){
        this.nav=navig;
        this.btn=button;
        menu.close();
    },
    close(){
        this.nav.classList.add('main-nav_closed');
        this.btn.classList.add('nav-btn_open');
        this.btn.classList.remove('nav-btn_close');
        this.btn.innerHTML='<span class="visually-hidden">Открыть меню</span>';
    },
    open(){
        this.nav.classList.remove('main-nav_closed');
        this.btn.classList.add('nav-btn_close');
        this.btn.classList.remove('nav-btn_open');
        this.btn.innerHTML='<span class="visually-hidden">Закрыть меню</span>';
    }
}

menu.init(document.querySelector('.menu'),document.querySelector('.nav-btn'));
skills.generateList(document.querySelector('dl.skill-list'));
if(localStorage.getItem("theme")==="light"){
   document.body.classList.remove("dark-theme");
   document.querySelector(".switch-checkbox").checked=true;
} 

document.querySelector(".skills-sort").addEventListener("click",function(e){
    if(e.target.tagName==="BUTTON"){
        switch(e.target.dataset.type){
            case 'name':
            case 'level':
                skills.sortList(e.target.dataset.type);
                skills.generateList(document.querySelector('dl.skill-list'));
                break;
            default:
                console.log(e.target.tagName);
                break;
        }
    }
});
document.querySelector(".nav-btn").addEventListener(
    "click", e => e.target.classList.contains('nav-btn_open') ? menu.open():menu.close()
);
document.querySelector('.switch-checkbox[type="checkbox"]').addEventListener("change",function(e){
    if(e.target.tagName==="INPUT" && e.target.className==="switch-checkbox"){
        if(e.target.checked){
            document.body.classList.remove("dark-theme")
            localStorage.setItem("theme","light")
        }
        else{
            document.body.classList.remove("dark-theme")
            document.body.classList.add("dark-theme")
            localStorage.setItem("theme","dark")
        }
    }
});

