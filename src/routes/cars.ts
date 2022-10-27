import { Router } from 'express';
import ControllerCars from '../controllers/controllerCars';
import ModelCars from '../models/modelCars';
import ServiceCars from '../services/serviceCars';

const route = Router();

const carModel = new ModelCars();
const carService = new ServiceCars(carModel);
const carController = new ControllerCars(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));
route.put('/cars/:id', (req, res) => carController.update(req, res));
route.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default route;