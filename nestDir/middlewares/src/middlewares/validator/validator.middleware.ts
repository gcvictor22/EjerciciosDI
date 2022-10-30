import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface User {
  nombre : string,
  apellido : string
}

@Injectable()
export class ValidatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user : User = req.body;
    if (!user.nombre || !user.apellido) {
      const errorMessage = 'Invalid body request'
      console.log(`Error: ${errorMessage}`)
      return res.status(400).send(errorMessage)
    }
    next();
  }
}
