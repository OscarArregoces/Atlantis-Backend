import { ProductModel } from "../models/product";
import { SaleModel } from "../models/sale"
import { mergeProductsInfo } from "../utils/mergeProducts";
import { DateSales, ProductInfo } from "../interfaces/utils";


const economyService = async () => {
  // Obtener la lista de productos únicos
  const products: string[] = await ProductModel.find().distinct('name');

  // Inicializar arrays y variables para almacenar resultados
  let tableRows: any[] = [];
  let totalGenerated: number = 0;
  let totalToGenerate: number = 0;
  let totalCurrentQuantity: number = 0;
  let totalQuantitySold: number = 0;
  let totalInvested: number = 0;

  // Iterar sobre cada producto único
  for (const productName of products) {
    // Obtener información del producto
    const productInfo = await ProductModel.findOne({ name: productName });

    if (!productInfo) {
      return;
    }

    // Obtener cantidad actual de productos
    const currentQuantity: number = productInfo.quantity ?? 0;

    // Obtener ventas del producto
    const sales = await SaleModel.find({ 'products.product': productInfo._id });

    // Calcular cantidad vendida y generada
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
    // Calcular por generar
    const toGenerate: number = productInfo.unit_price !== undefined ? productInfo.unit_price * currentQuantity : 0;

    // Agregar a la lista de filas de tabla
    tableRows.push({
      product: productName,
      current_quantity: currentQuantity,
      quantity_sold: quantitySold,
      unit_price: productInfo.unit_price,
      unit_cost: productInfo.unit_cost,
      generated: generated,
      to_generate: toGenerate,
    });

    // Actualizar totales
    totalGenerated += generated;
    totalToGenerate += toGenerate;
    totalCurrentQuantity += currentQuantity;
    totalQuantitySold += quantitySold;
    totalInvested += productInfo.unit_cost !== undefined ? productInfo.unit_cost : 0;
  }

  // Construir resultado final
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

  // Enviar resultado como respuesta
  return result;
}

const dashboardGraphicService = async () => {

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
  const result = await SaleModel.aggregate([
    {
      $unwind: '$products'
    },
    {
      $lookup: {
        from: 'products', // Asegúrate de usar el nombre correcto de tu colección de productos
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
        from: 'products', // Asegúrate de usar el nombre correcto de tu colección de productos
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
      $match: { quantity: { $gt: 0 } } // Filtrar productos que aún tienen existencias
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
      $match: { quantity: { $gt: 0 } } // Filtrar productos que aún tienen existencias
    },
    {
      $group: {
        _id: null,
        totalPorGenerar: { $sum: '$quantity' }
      }
    }
  ]);

  // Estructura final
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


