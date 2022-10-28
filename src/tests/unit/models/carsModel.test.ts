import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/modelCars';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import {
	carsMock,
	carsMockWithId,
	carsMockForChange,
	carsMockForChangeWithId,
} from '../../mocks/carsMock';
import { ErrorTypes } from '../../../Erros/Catalog';

describe('Cars Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carsMockWithId);
    sinon.stub(Model, 'find').resolves([carsMock]);
		sinon.stub(Model, 'findOne').resolves(carsMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carsMockWithId);
    sinon.stub(Model, 'findOneAndDelete').resolves(carsMockWithId);
	});

	after(() => {
		sinon.restore();
	})

	describe('creating a cars', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carsMock);
			expect(newCar).to.be.deep.equal(carsMockWithId);
		});
	});

  describe('Read cars', () => {
    it('Succes', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal([carsMock]);
    });
  });

	describe('searching a car', () => {
		it('successfully found', async () => {
			const frameFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(frameFound).to.be.deep.equal(carsMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
	
	describe('changing a car', () => {
		it('successfully changed', async () => {
			const carChanged = await carModel.update('4edd40c86762e0fb12000003', carsMockWithId);
			expect(carChanged).to.be.deep.equal(carsMockWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await carModel.update('123ERRADO', carsMockWithId);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
  describe('Delete cars', () => {
    it('Success', async () => {
      const deleted = await carModel.delete(carsMockWithId._id);
      expect(deleted).to.be.deep.equal(carsMockWithId);
    });

    it('Error _id not found to change', async () => {
      before(() => {
        sinon.stub(mongoose, 'isValidObjectId').returns(false);
      })

      try {
        await carModel.delete('iderrado');
      } catch (err: any) {
        expect(err.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }

      after(() => {
        sinon.restore();
      });
    });
  });
});