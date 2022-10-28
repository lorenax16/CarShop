import IService from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../Erros/Catalog';

class CarService implements IService<ICar> {
  private _Car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._Car = model;
  }

  public async create(obj:unknown):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw new Error(ErrorTypes.InvalidRequest);
    }
    return this._Car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._Car.read();
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._Car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw new Error(ErrorTypes.InvalidRequest);
    }

    const updated = await this._Car.update(_id, parsed.data);
    if (!updated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }

    return updated;
  }

  public async delete(_id: string): Promise<ICar> {
    const deleted = await this._Car.delete(_id);
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);
    return deleted;
  }
}

export default CarService;