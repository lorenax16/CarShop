import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const CarMongooseSchema = new Schema<ICar>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    seatsQty: Number,
    doorsQty: Number,
  }, 
  { versionKey: false },
);

class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', CarMongooseSchema)) {
    super(model);
  }
}

export default Car;