import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../Erros/Catalog';
import CarModel from '../../../models/modelCars';
import CarService from '../../../services/serviceCars';
import { carsMock, carsMockWithId, mockErrado } from '../../mocks/carsMock';

describe('Cars Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').onCall(0).resolves(carsMockWithId);
    sinon.stub(carModel, 'read').resolves([carsMockWithId]);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carsMockWithId)
			.onCall(1).resolves(null);
    sinon.stub(carModel, 'update').onCall(0).resolves(carsMockWithId)
			.onCall(1).resolves(null)
			.onCall(2).resolves(null);
    sinon.stub(carModel, 'delete').onCall(0).resolves(carsMockWithId)
			.onCall(1).resolves(null);
	});

	after(() => {
		sinon.restore()
	});
  
	describe('Create Cars', () => {
		it('Success', async () => {
			const frameCreated = await carService.create(carsMock);

			expect(frameCreated).to.be.deep.equal(carsMockWithId);
		});

		it('Failure', async () => {
			let error;

			try {
				await carService.create({});
			} catch (err) {
				error = err;
			}

			expect(error).to.be.instanceOf(Error);
		});
	});

  describe('Read Car', () => {
    it('Succes', async () => {
      const get = await carService.read();
      expect(get).to.be.deep.equal([carsMockWithId])
    });
  });

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const frameCreated = await carService.readOne('abobrinha');

			expect(frameCreated).to.be.deep.equal(carsMockWithId);
		});

		it('Failure', async () => {
			let error;

			try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carService.readOne(carsMockWithId._id);
			} catch (err:any) {
				error = err;
			}

			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

	describe('Update Car', () => {
		it('Success', async () => {
			// console.log(carsMock);
			const updated = await carService.update(carsMockWithId._id, carsMock);

			expect(updated).to.be.deep.eq(carsMockWithId);
		})
		
		it('Failure - Zod', async () => {
			let error;

			try {
				await carService.update('4edd40c86762e0fb12000003', {})
			} catch(err) {
				error = err;
			}

			expect(error).to.be.instanceOf(Error)
		})

		it('Failure - Car not Found', async () => {
			let error: any;

			try {
				await carService.update('qualquer coisa', carsMock)
			} catch(err) {
				error = err;
			}

			expect(error).to.be.instanceOf(Error);
		});
	});


  describe('Delete Car', () => {
    it('Succes', async () => {
      const deleted = await carService.delete(carsMockWithId._id);
      expect(deleted).to.be.deep.equal(carsMockWithId);
    });

		it('Failure - Car not Found', async () => {
			let error: any;

			try {
				await carService.delete('qualquer coisa')
			} catch(err) {
				error = err;
			}

			expect(error).to.be.instanceOf(Error);
		});
  });

});
