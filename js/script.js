'use strict';
let skills = {
    data : [
        {skill:'html',level:40,class:'skill-item_html',iconName:'html.svg'},
        {skill:'css',level:40,class:'skill-item_css',iconName:'css.svg'},
        {skill:'c#',level:40,class:'skill-item_csharp',iconName:'csharp.svg'},
        {skill:'cpp',level:40,class:'skill-item_cpp',iconName:'c++.svg'},
        {skill:'python',level:40,class:'skill-item_python',iconName:'python.svg'},
    ],
    generateList(parentElement){
        this.data.forEach(elem => {
            let dt = document.createElement('dt')
            dt.classList.add(elem.class, 'skill-item')
            dt.textContent=elem.skill
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
skills.generateList(document.querySelector('dl.skill-list'))









