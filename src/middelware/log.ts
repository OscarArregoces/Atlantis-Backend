import { NextFunction, Request, Response } from "express";

const logMiddelware = (req: Request, res: Response, next: NextFunction) => {
    console.log('Middelware aqui')
    next();
}

export { logMiddelware };