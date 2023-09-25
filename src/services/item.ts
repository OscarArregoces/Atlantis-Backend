import { Car } from "../interfaces/car.interface";
import ItemModel from "../models/item";

const insertCar = async (item: Car) => {
    const responseInsert = await ItemModel.create(item);
    return responseInsert;
}

const findItems = async () => {
    const responseItems = await ItemModel.find({});
    return responseItems;
}
const findItem = async (idItem: string) => {
    const responseItem = await ItemModel.findOne({ _id: idItem });
    return responseItem;
}
const updateCar = async (idItem: string, data: Car) => {
    const responseItem = await ItemModel.findOneAndUpdate({ _id: idItem }, data, { new: true });
    return responseItem;
}
const deleteCar = async (idItem: string) => {
    const responseItem = await ItemModel.findOneAndDelete({ _id: idItem });
    return responseItem;
}


export { insertCar, findItems, findItem, updateCar, deleteCar };