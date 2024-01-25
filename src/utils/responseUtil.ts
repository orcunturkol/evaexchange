import { Response } from 'express';

export const sendResponse = (res: Response, statusCode: number, message: string, success:boolean, data?:any) => {
  // Include data in the response if it's provided
  if (data) {
    const response = {
      success,
      message,
      data
    };  
    res.status(statusCode).json(response);
  }
  else {
    const response = {
      success,
      message
    };  
    res.status(statusCode).json(response);
  }
};
