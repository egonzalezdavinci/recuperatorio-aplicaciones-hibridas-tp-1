import express from 'express';
import * as controllers from '../controller/project-controller.js';
import path from 'node:path';
const route = express.Router()


route.get('/', controllers.getMenuSlug);
route.get('/:slug', controllers.getProductoSlug);
route.get('/view/:idProyect', controllers.getProductId);

export default route