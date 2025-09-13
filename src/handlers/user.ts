import { RequestHandler } from "express";

export const getUsers: RequestHandler = (req, res) => {
  res.status(200).send([{
    'name': 'Ammar',
    'age': 19,
    
    }, {
      'name': 'Abdelfattah',
      'age': 72
    }
  ]);
}