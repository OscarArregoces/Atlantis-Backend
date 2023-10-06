import { Product } from "../interfaces/product";
import { Sale } from "../interfaces/sale";
import { ProductModel } from "../models/product";
import { SaleModel } from "../models/sale";

const addNewSale = async (dataSale: Sale) => {
    const { products } = dataSale;

    let allProductsValid = true;
    let currentProduct: string | undefined = '';

    for (const productData of products) {
        const productId = productData.product;
        const quantityRequested = productData.quantity;

        const product: Product | null = await ProductModel.findById(productId);

        if (!product || product.quantity < quantityRequested) {
            allProductsValid = false;
            currentProduct = product?.name;
            break;
        }
    }

    if (!allProductsValid) {
        return `El producto [${currentProduct}] no tiene cantidades suficientes`
    }

    const newSale = await SaleModel.create(dataSale);

    for (const productData of products) {
        const productId = productData.product;
        const quantityRequested = productData.quantity;

        await ProductModel.findByIdAndUpdate(productId, { $inc: { quantity: -quantityRequested } });
    }

    return newSale;
}

const findAllSales = async () => {
    const sales = await SaleModel.find();
    return sales;
};
const findSaleById = async (id: string) => {
    const sale = await SaleModel.findOne({ _id: id });
    if (!sale) return 'Not exist';
    return sale;
};
const updateSaleById = async (id: string, dataSale: Sale) => {

    const { products } = dataSale;

    const existingSale: Sale | null = await SaleModel.findById(id);
    if (!existingSale) {
        return 'Sale not exist'
    }

    let existProduct = true;
    for (const updatedProduct of products) {
        const productId = updatedProduct.product;
        const newQuantity = updatedProduct.quantity;

        const product: Product | null = await ProductModel.findById(productId);

        if (!product) {
            existProduct = false;
            break;
        }

        const oldQuantity = existingSale.products.find(p => p.product.toString() === productId.toString())?.quantity || 0;

        if (newQuantity > oldQuantity) {
            if (product.quantity < newQuantity - oldQuantity) {
                return 'No hay suficiente cantidad en stock';
            }
            await ProductModel.findByIdAndUpdate(productId, { $inc: { quantity: -(newQuantity - oldQuantity) } });
        } else if (newQuantity < oldQuantity) {
            await ProductModel.findByIdAndUpdate(productId, { $inc: { quantity: (oldQuantity - newQuantity) } });
        }
    }
    if (!existProduct) return 'Product not exist';

    existingSale.products = products;
    const newSale = await SaleModel.findOneAndUpdate({ _id: id }, dataSale, { new: true })

    return newSale;

};
const deleteSaleById = async (id: string) => {
    const saleDeleted = await SaleModel.findOneAndDelete({ _id: id });
    if (!saleDeleted) return 'Not exist';
    return saleDeleted;
};

export { addNewSale, findAllSales, findSaleById, updateSaleById, deleteSaleById };