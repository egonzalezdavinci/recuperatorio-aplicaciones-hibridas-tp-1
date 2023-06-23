import * as services from '../../services/proyect-services.js';

function getMenuItems(req,res){
    services.getMenu()
    .then(function(items){
        res.status(200).json(items)
    }).catch();
}

function getProducts(req,res){
    const filter = req.query;

    services.getAllProducts(filter)
    .then(function(products){
        res.status(200).json(products)
    }).catch();
}

function createProject(req, res){
    const product = {
        name: req.body.nombre,
        description: req.body.descripcion,
        link: req.body.link,
        img: req.body.image,
        technologies: [req.body.bootstrap, req.body.html, req.body.vue, req.body.php, req.body.javascript, req.body.laravel],
        section: req.body.categoria
    }
    services.createProject(product).then(function(product){
        res.status(201).json(product);
    });
}

function getProjectId(req,res){
    let id = req.params.idProyect; 
    
    services.getProductById(id).then(function(product){
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({error:{message:'El producto no se encuentra disponible'}});
        }
    });   
}

function editProjectId(req, res){
    let id = req.params.idProyect;

    const product = {
        name: req.body.nombre,
        description: req.body.descripcion,
        link: req.body.link,
        img: req.body.image,
        technologies: [req.body.bootstrap, req.body.html, req.body.vue, req.body.php, req.body.javascript, req.body.laravel],
        section: req.body.categoria
    }

    services.editProjectConfirm(id,product).then(function(product){
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({error:{message:'El producto no se encuentra disponible'}});
        }
    })

}

function updateProjectId(req, res){
    let id = req.params.idProyect;

    const product = {}
    if(req.body.name){
        product.name = req.body.name
    }
    if(req.body.description){
        product.description = req.body.description
    }
    if(req.body.link){
        product.link = req.body.link
    }
    if(req.body.image){
        product.img = req.body.image
    }
    
    let tech = [req.body.bootstrap, req.body.html, req.body.vue, req.body.php, req.body.javascript, req.body.laravel];
    let valTech = [];
    for(let i = 0; i < tech.length ;i++){
        if(tech[i]){
            valTech.push(tech[i]);
        }
    }
    if(valTech){
        product.technologies = valTech;
    }
    if(req.body.section){
        product.section = req.body.section
    }

    services.editProjectConfirm(id,product).then(function(product){
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({error:{message:'El producto no se encuentra disponible'}});
        }
    })
}

function deleteProjectId(req, res){
    const id = req.params.idProyect;
    services.deleteProject(id).then(function(product){
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({error:{message:'El producto no se se pudo borrar'}});
        }
    });
}

export{
    getMenuItems,
    getProducts,
    createProject,
    getProjectId,
    editProjectId,
    updateProjectId,
    deleteProjectId
}