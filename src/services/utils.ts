import { ProductModel } from "../models/product";
import { SaleModel } from "../models/sale"
import { mergeProductsInfo } from "../utils/mergeProducts";
import { DateSales, ProductInfo } from "../interfaces/utils";

const economyService = async () => {
  const products: string[] = await ProductModel.find().distinct('name');

  let tableRows: any[] = [];
  let totalGenerated: number = 0;
  let totalToGenerate: number = 0;
  let totalCurrentQuantity: number = 0;
  let totalQuantitySold: number = 0;
  let totalInvested: number = 0;

  for (const productName of products) {
    const productInfo = await ProductModel.findOne({ name: productName });

    if (!productInfo) {
      return;
    }

    const currentQuantity: number = productInfo.quantity ?? 0;

    const sales = await SaleModel.find({ 'products.product': productInfo._id });

    let quantitySold: number = 0;
    let generated: number = 0;

    sales.forEach((sale) => {
      const productSale = sale.products.find((p) => p.product.toString() === productInfo._id.toString());

      if (productSale) {
        const saleQuantity = productSale.quantity || 0;
        const unitPrice = productInfo.unit_price;

        if (unitPrice !== undefined) {
          quantitySold += saleQuantity;
          generated += unitPrice * saleQuantity;
        } else {
          console.error(`Unit price is undefined for product: ${productName}`);
        }
      }
    });
    const toGenerate: number = productInfo.unit_price !== undefined ? productInfo.unit_price * currentQuantity : 0;

    tableRows.push({
      product: productName,
      current_quantity: currentQuantity,
      quantity_sold: quantitySold,
      unit_price: productInfo.unit_price,
      unit_cost: productInfo.unit_cost,
      generated: generated,
      to_generate: toGenerate,
    });

    totalGenerated += generated;
    totalToGenerate += toGenerate;
    totalCurrentQuantity += currentQuantity;
    totalQuantitySold += quantitySold;
    totalInvested += productInfo.unit_cost !== undefined ? productInfo.unit_cost : 0;
  }

  const result = {
    tableRows: tableRows,
    deductions: {
      revenue_generated: totalGenerated,
      to_generate: totalToGenerate,
      current_quantity_products: totalCurrentQuantity,
      quantity_products_sold: totalQuantitySold,
      invested: totalInvested,
    },
  };

  return result;
}

const dashboardGraphicService = async () => {
  const sales = await SaleModel.find({});
  if (sales.length === 0) {
    const response = [
      {
        name: "Sin productos"
      }
    ]
    return response;
  }


  let salesByDate = await SaleModel.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        sales: { $push: '$$ROOT' },
      },
    },
    {
      $sort: {
        '_id': -1
      }
    }
  ]);

  if (salesByDate.length > 7) {
    salesByDate = salesByDate.slice(0, 7)
  }


  const dataSorted: DateSales[] = [];

  for (const dateEntry of salesByDate) {
    const dateSales: DateSales = {
      _id: dateEntry._id,
      productsInfo: [],
    };

    const productMap = new Map<string, ProductInfo>();

    for (const sale of dateEntry.sales) {
      for (const productSale of sale.products) {
        const productId = productSale.product;
        const quantity = productSale.quantity;
        const totalValue = sale.totalSale;

        if (productMap.has(productId)) {
          const existingProduct = productMap.get(productId);
          existingProduct!.quantity += quantity;
          existingProduct!.totalValue += totalValue;
        } else {
          const newProduct: ProductInfo = {
            name: productId,
            quantity: quantity,
            totalValue: totalValue,
          };
          productMap.set(productId, newProduct);
        }
      }
    }

    dateSales.productsInfo = [...productMap.values()];
    dataSorted.push(dateSales);
  }

  const response = dataSorted.map((sale) => {
    const newProducts = mergeProductsInfo(sale.productsInfo);
    return { fecha: sale._id, productsInfo: newProducts }
  });

  return response;
}

const dashboardGraphicTranslateService = async (nameProducts: string[]) => {
  const products = await ProductModel.find({ _id: { $in: nameProducts } });
  const names = products.map((product) => product.name);
  return names;
}
const dashboardRankingProductsService = async () => {
  const existSales = await SaleModel.find({});
  if (existSales.length === 0) {
    const response = [{
      productDetails: { name: "No hay productos vendidos" },
      totalQuantity: 0,
      totalRevenue: 0,
    }]
    return response;
  }
  const result = await SaleModel.aggregate([
    {
      $unwind: '$products'
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $project: {
        _id: '$products.product',
        totalQuantity: '$products.quantity',
        totalRevenue: { $multiply: ['$products.quantity', { $arrayElemAt: ['$productDetails.unit_price', 0] }] }
      }
    },
    {
      $group: {
        _id: '$_id',
        totalQuantity: { $sum: '$totalQuantity' },
        totalRevenue: { $sum: '$totalRevenue' }
      }
    },
    {
      $sort: { totalQuantity: -1 }
    },
    {
      $limit: 8
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        totalQuantity: 1,
        totalRevenue: 1,
        productDetails: { $arrayElemAt: ['$productDetails', 0] }
      }
    }
  ]);

  return result;
}

const dashboardItemsService = async () => {

  const existProducts = await ProductModel.find({});
  const existSales = await SaleModel.find({});

  if (existProducts.length === 0) {
    const response = [
      {
        type: "Productos",
        total_productos: 0,
        tipo_productos: 0,
      },
      {
        type: "Ingresos",
        generados: 0,
        por_generar: 0,
      },
      {
        type: "Ventas",
        generadas: 0,
        por_generar: 0,
      }
    ]
    return response
  }
  if (existProducts.length > 0 && existSales.length === 0) {
    const tiposProductos = await ProductModel.distinct('name').countDocuments();
    const response = [
      {
        type: "Productos",
        total_productos: existProducts.length,
        tipo_productos: tiposProductos,
      },
      {
        type: "Ingresos",
        generados: 0,
        por_generar: 0,
      },
      {
        type: "Ventas",
        generadas: 0,
        por_generar: 0,
      }
    ]
    return response
  }


  const totalProductos = await ProductModel.aggregate([
    {
      $group: {
        _id: null,
        totalProductos: { $sum: '$quantity' }
      }
    }
  ]);

  const tiposProductos = await ProductModel.distinct('name').countDocuments();

  const ventasGeneradas = await SaleModel.countDocuments();
  const ingresosGenerados = await SaleModel.aggregate([
    {
      $group: {
        _id: null,
        totalIngresos: { $sum: '$totalSale' }
      }
    }
  ]);

  const productosPorGenerar = await ProductModel.aggregate([
    {
      $match: { quantity: { $gt: 0 } }
    },
    {
      $group: {
        _id: null,
        totalPorGenerar: { $sum: { $multiply: ['$quantity', '$unit_price'] } }
      }
    }
  ]);

  const ventasPorGenerar = await ProductModel.aggregate([
    {
      $match: { quantity: { $gt: 0 } }
    },
    {
      $group: {
        _id: null,
        totalPorGenerar: { $sum: '$quantity' }
      }
    }
  ]);


  const estadisticas = [
    {
      type: "Productos",
      total_productos: totalProductos[0].totalProductos,
      tipo_productos: tiposProductos
    },
    {
      type: "Ingresos",
      generados: ingresosGenerados.length > 0 ? ingresosGenerados[0].totalIngresos : 0,
      por_generar: productosPorGenerar.length > 0 ? productosPorGenerar[0].totalPorGenerar : 0
    },
    {
      type: "Ventas",
      generadas: ventasGeneradas,
      por_generar: ventasPorGenerar.length > 0 ? ventasPorGenerar[0].totalPorGenerar : 0
    }
  ]

  return estadisticas;
}

export { economyService, dashboardGraphicService, dashboardGraphicTranslateService, dashboardRankingProductsService, dashboardItemsService };


