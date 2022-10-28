export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  InvalidRequest = 'InvalidRequest',
}

type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  InvalidRequest: {
    error: 'Request error',
    httpStatus: 400,
  },

};