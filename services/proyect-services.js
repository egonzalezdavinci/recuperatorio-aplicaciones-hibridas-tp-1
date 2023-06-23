import { writeFile } from 'node:fs/promises';
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("AH20231CP1");

async function getMenu(){
    await client.connect();
    return db.collection("menu").find().toArray();
}

async function getProducts(slug, filter = {}){
    await client.connect();
    const filterProduct = {deleted: {$ne:true}};
          filterProduct.$text = {$search: slug}

    return db.collection("Projects").find(filterProduct).toArray()
    
}

async function getAllProducts(filter = {}){

    await client.connect();
    const filterProduct = {deleted: {$ne:true}};

    if(filter?.section){
       filterProduct.$text = {$search: filter.section};
    }
    if(filter?.technologies){
        filterProduct.technologies = {$all: filter.technologies.split(";")};
     }
    
    return db.collection("Projects").find(filterProduct).toArray()
}

async function getProduct(products, idProyect){
    await client.connect();
    return db.collection("Projects").findOne({ _id: new ObjectId(idProyect)});
}

async function getProductById(id) {
    await client.connect();
    return db.collection("Projects").findOne( {_id: new ObjectId(id)} );
}

async function guardarProject(product){
    return writeFile('./data/product-proyect.json', JSON.stringify(product));
}

async function createProject(product){
    await client.connect();
    await db.collection("Projects").insertOne(product);
    return product;
}

async function editProjectConfirm(idProyect, product){
    await client.connect();
    await db.collection("Projects").replaceOne({ _id: new ObjectId(idProyect)}, product);
    return product
}

async function deleteProject(idProyect){
    await client.connect();
    await db.collection("Projects").deleteOne({ _id: new ObjectId(idProyect)});
    return {
        id: idProyect
    }
}


export{
    getProducts,
    getAllProducts,
    getProductById,
    getMenu,
    createProject,
    editProjectConfirm,
    deleteProject,
    guardarProject,
    getProduct
}