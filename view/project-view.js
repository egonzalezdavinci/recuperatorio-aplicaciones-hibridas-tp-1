import { contentHtml } from "../pages/utils.js";
import * as generatorHtml from '../pages/utils.js';

function createMenu(product){
    let html = `<ul class="items-menu">`;
        for(let i = 0; i < product.length; i++){
            html += `<li><a href="${product[i].slug}">${product[i].name}</a></li>`;
        }
        html += `</ul>`;
        return generatorHtml.contentHtml('Proyectos Digitales',html);
}

function viewProjects(products){
    let html = '';
    
    if(products.length === 0){
        return generatorHtml.contentHtmlProjects('pagina no encontrada', 'No encontramos el producto que estas buscando.');
    }else{
        for(let i = 0; i < products.length; i++){
            html += `<h2>${products[i].name}</h2>`;
            html += `<ul>`;
            html += `<li><p>${products[i].description}</p></li>`;
            html += `<li><a href="view/${products[i]._id}">Ver Proyecto</a></li>`;
            html += `</ul>`;
        }
        return generatorHtml.contentHtmlProjects('Ver proyectos', html);
    }
}

function viewProject(products){

    if(products){
            let titulo = products.name;
            let html = `<h2>${products.name}</h2>`;
            html += `<ul>`;
            html += `<li><p>${products.description}</p></li>`;
            html += `<li><img src="${products.img}" alt="${products.name}"/></li>`;
            html += `<li><p>${products.link}</p></li>`;
            html += `<li><p>${products.technologies}</p></li>`;
            html += `</ul>`;

            return generatorHtml.contentHtmlProject(titulo,html);
    }else{
            return generatorHtml.contentHtmlProject('pagina no encontrada','Lamentablente no encontramos el producto que estas buscando.');
    }
}


export{
    createMenu,
    viewProjects,
    viewProject,
    contentHtml
}

