import config from '../server.config';
import { ValidationError } from 'class-validator';
import { Application, Request, Response, NextFunction } from 'express';
import { print } from 'logscribe';
import { QueryFailedError } from 'typeorm';

type TCustomErrorResponse = {
  code: string;
  message: string;
}[];

export const errorResolver = (app: Application) => {
  /**
   * This is a custom Express error resolver to
   * unify error handling.
   *
   * https://expressjs.com/en/guide/error-handling.html
   */
  app.use(
    (
      // All four arguments should exist for the
      // middleware to work, even though all arguments aren't used.
      err: QueryFailedError | ValidationError[],
      req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) => {
      try {
        const response: TCustomErrorResponse = [];
        let status = 500;
        if (Array.isArray(err)) {
          // Likely a class-validator validation error.
          for (const verr of err) {
            response.push({
              code: 'CLASS_VALIDATOR',
              message: verr.toString(),
            });
            if (config.isDevelopment) {
              print(verr);
            }
          }
          status = 400;
        } else {
          // TypeORM query or a generic error.
          response.push({
            code: 'GENERIC_ERROR',
            message: err?.message,
          });
          if (config.isDevelopment) {
            print(err?.message || err || 'Malformed error.');
          }
        }
        res.status(status).send(
          response.length
            ? response
            : [
                {
                  code: 'UNKNOWN',
                  message: 'Unknown server error encountered.',
                },
              ]
        );
      } catch (error) {
        print(error);
      }
    }
  );
};
