'use strict';
let skills = {
    sortMode:null,
    data : [
        {name:'html',level:40,class:'skill-item_html',iconName:'html.svg'},
        {name:'css',level:40,class:'skill-item_css',iconName:'css.svg'},
        {name:'c#',level:40,class:'skill-item_csharp',iconName:'csharp.svg'},
        {name:'cpp',level:40,class:'skill-item_cpp',iconName:'c++.svg'},
        {name:'python',level:40,class:'skill-item_python',iconName:'python.svg'},
    ],
    getComparator(prop){
        return (a,b)=> a[prop]>b[prop] ? 1 : a[prop]<b[prop] ? -1:0
    },
    sortList(type){
        if(this.sortMode!=type) {
            this.data.sort(this.getComparator(type));
            console.log(`ОТСОРТИРОВАЛИ ПО ${type}`)
        }
        else{
            this.data.reverse();
            console.log(`ИНВЕРТИРОВАЛИ ПО ${type}`)
        } 
        this.sortMode=type;
        this.generateList(document.querySelector('dl.skill-list'));
    },
    generateList(parentElement){
        parentElement.innerHTML=""
        this.data.forEach(elem => {
            let dt = document.createElement('dt')
            dt.classList.add(elem.class, 'skill-item')
            dt.textContent=elem.name
            dt.style.backgroundImage=`url('./img/skill_${elem.iconName}')`
            let dd = document.createElement('dd')
            dd.classList.add('skill-level')
            let div = document.createElement('div')
            div.textContent=`${elem.level}%`
            div.style.width=div.textContent
            dd.appendChild(div)
            parentElement.appendChild(dt)
            parentElement.appendChild(dd)
        });
        return parentElement
    }
}
let menu ={
    opened:true,
    nav : document.getElementsByClassName('menu')[0],
    btn : document.getElementsByClassName('nav-btn')[0],
    close(){
        this.nav.classList.add('main-nav_closed')
        this.btn.classList.add('nav-btn_open')
        this.btn.classList.remove('nav-btn_close')
        this.btn.innerHTML='<span class="visually-hidden">Открыть меню</span>'
    },
    open(){
        this.nav.classList.remove('main-nav_closed')
        this.btn.classList.add('nav-btn_close')
        this.btn.classList.remove('nav-btn_open')
        this.btn.innerHTML='<span class="visually-hidden">Закрыть меню</span>'
    }
}
menu.close()
skills.generateList(document.querySelector('dl.skill-list'))
document.getElementsByClassName("skills-sort")[0].addEventListener("click",function(e){
    if(e.target.tagName==="BUTTON"){
        switch(e.target.dataset.type){
            case 'name':
            case 'level':
                skills.sortList(e.target.dataset.type)
                break;
            default:
                console.log(e.target.tagName)
                break;
        }
    }
});
document.getElementsByClassName("nav-btn")[0].addEventListener(
    "click", e=>e.target.classList.contains('nav-btn_open') ? menu.open():menu.close()
);










