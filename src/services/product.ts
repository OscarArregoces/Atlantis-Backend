import { Product } from "../interfaces/product";
import { ProductModel } from "../models/product";

const addProduct = async (dataProduct: Product) => {
    const newProduct = await ProductModel.create(dataProduct);
    return newProduct;
};
const findAllProducts = async () => {
    const products = await ProductModel.find().populate('category');
    return products;
};
const findProductById = async (id: string) => {
    const product = await ProductModel.findOne({ _id: id }).populate('category');
    if (!product) return 'Product not exist';
    return product;
};
const updateProductById = async (id: string, dataProduct: Product) => {
    const newProduct = await ProductModel.findOneAndUpdate({ _id: id }, dataProduct, { new: true });
    if (!newProduct) return 'Product not exist';
    return newProduct;
};
const deleteProductById = async (id: string) => {
    const newProduct = await ProductModel.findOneAndDelete({ _id: id });
    if (!newProduct) return 'Product not exist';
    return newProduct;
};

export {
    addProduct,
    findAllProducts,
    findProductById,
    updateProductById,
    deleteProductById,
};