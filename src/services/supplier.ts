import { Supplier } from "../interfaces/supplier";
import { SupplierModel } from "../models/supplier";

const createNewSupplier = async (dataSupplier: Supplier) => {
    const { name, phone, email, address } = dataSupplier;
    const isExist = await SupplierModel.findOne({
        $or: [
            { name: name },
            { phone: phone },
            { email: email },
            { address: address },
        ]
    });
    if (isExist) return 'Supplier already exist';
    const newSupplier = await SupplierModel.create(dataSupplier);
    return newSupplier;
};
const findSuppliers = async () => {
    const suppliers = await SupplierModel.find().sort({ updatedAt: -1 });
    return suppliers;
};
const updateSupplierById = async (id: string, dataSupplier: Supplier) => {
    const isExist = await SupplierModel.findOne({ _id: id });
    if (!isExist) return 'Supplier not found';
    const newSupplier = await SupplierModel.findOneAndUpdate({ _id: id }, dataSupplier, { new: true });
    return newSupplier;
};
const deleteSupplierById = async (id: string) => {
    const response = await SupplierModel.findOneAndDelete({ _id: id });
    if (!response) return 'Supplier not found';
    return response;
};

export {
    createNewSupplier,
    findSuppliers,
    updateSupplierById,
    deleteSupplierById
};
