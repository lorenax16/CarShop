import { expect } from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import CarsController from '../../../controllers/controllerCars';
import CarsModel from '../../../models/modelCars';
import CarsService from '../../../services/serviceCars';
import { carsMock, carsMockWithId } from '../../mocks/carsMock';


describe('Cars Controller', () => {
  const carModel = new CarsModel()
  const carService = new CarsService(carModel);
  const carController = new CarsController(carService);
  // Nosso req vai ser um objeto com cast de Request, pois o controller só aceita um Request como primeiro parâmetro
  const req = {} as Request; 
  // Mesma coisa com o segundo parâmetro
  const res = {} as Response;

  beforeEach(() => {
    sinon.stub(carService, 'read').resolves([carsMockWithId]);
    sinon.stub(carService, 'readOne').resolves(carsMock);
    sinon.stub(carService, 'delete').resolves(carsMockWithId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore()
  })

  describe('Create Cars', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carsMock);
    })

    it('Success', async () => {

      req.body = carsMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carsMock)).to.be.true;
    });
  });

  describe('Read Cars', () => {
    it('Success', async () => {
      // const jsonStub = res.json as sinon.SinonStub;

      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      // expect(jsonStub.calledWith([carsMockWithId])).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carsMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    });
  });

  describe('Update Cars', () => {
    it('Success', async () => {
      sinon.stub(carService, 'update').resolves(carsMockWithId)

      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMockWithId)).to.be.true;
    })
  });

  describe('Delete Cars', () => {
    it('Apaga o carro pelo id', async () => {

      req.params = { id: carsMockWithId._id }
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    })
  })

});


