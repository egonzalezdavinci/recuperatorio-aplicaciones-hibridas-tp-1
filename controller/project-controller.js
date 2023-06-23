import * as generatorHtml from '../pages/utils.js';
import * as services from '../services/proyect-services.js';
import * as views from '../view/project-view.js';

function getMenuSlug(req,res){
    services.getMenu().then(function(product){
        res.send(views.createMenu(product));
    });
}

function getProductoSlug(req, res){
    let slug = req.params.slug;
    services.getProducts(slug, {deleted: true}).then(function(products){
        res.send(views.viewProjects(products));
    });
}

function getProductId(req,res){
    let id = req.params.idProyect; 

    services.getProductById(id)
        .then(function (product) {
            if (product) {
                res.send(views.viewProject(product))
            }
            else {
                res.send(generatorHtml.contentHtmlProject('pagina no encontrada','Lamentablente no encontramos el producto que estas buscando.'))
            }
        })
}

export{
    getMenuSlug,
    getProductoSlug,
    getProductId
}