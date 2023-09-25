import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { insertCar, findItems, findItem, updateCar, deleteCar } from "../services/item";
import { RequestExt } from "../interfaces/req-exte";

const getItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const responseItem = await findItem(id);
        res.status(200).send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM', e);
    }
}
const getItems = async (req: RequestExt, res: Response) => {
    try {
        const responseItems = await findItems();
        res.status(200).send({
            user: req.user,
            data: responseItems
        });
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEMS', e);
    }
}
const createItem = async (req: Request, res: Response) => {
    try {
        const responseItem = await insertCar(req.body)
        res.status(200).send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_POST_ITEMS', e);
    }
}
const updateItem = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseUpdateItem = await updateCar(id, body);
        res.status(200).send({ responseUpdateItem });
    } catch (e) {
        handleHttp(res, 'ERROR_UPDATE_ITEM', e);
    }
}
const deleteItem = async ({params}: Request, res: Response) => {
    try {
        const { id } = params;
        const responseDeleteItem = await deleteCar(id);
        res.status(200).send({ responseDeleteItem })
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_ITEM', e);
    }
}

export { getItem, getItems, updateItem, deleteItem, createItem };