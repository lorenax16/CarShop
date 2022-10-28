import { ICar } from '../../interfaces/ICar';

const carsMock:ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  status: true,
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carsMockWithId:ICar & { _id:string } = {
	_id: '4edd40c86762e0fb12000003',
	...carsMock,
};

const carsMockForChange:ICar = {
	model: "Fiat Uno",
  year: 1963,
  color: "blue",
  status: true,
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4
};

const carsMockForChangeWithId:ICar & { _id:string } = {
	_id: '62cf1fc6498565d94eba52cd',
	...carsMockForChange,
};

const mockErrado: ICar = {
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  status: true,
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4
}

export {
	carsMock,
	carsMockWithId,
	carsMockForChange,
	carsMockForChangeWithId,
  mockErrado,
};