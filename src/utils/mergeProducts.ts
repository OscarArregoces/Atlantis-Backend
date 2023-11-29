interface ProductInfo {
    name: string;
    quantity: number;
    totalValue: number;
}

export function mergeProductsInfo(productsInfo: ProductInfo[]): ProductInfo[] {
    const result: { [name: string]: ProductInfo } = {};
  
    // Iterar sobre el array original
    productsInfo.forEach((product) => {
      const { name, quantity, totalValue } = product;
  
      // Verificar si ya existe una entrada para el nombre en el objeto result
      if (result[name]) {
        // Si existe, sumar las cantidades y los valores totales
        result[name].quantity += quantity;
        result[name].totalValue += totalValue;
      } else {
        // Si no existe, crear una nueva entrada en el objeto result
        result[name] = { name, quantity, totalValue };
      }
    });
  
    // Convertir el objeto result de nuevo a un array
    const mergedProductsInfo: ProductInfo[] = Object.values(result);
  
    return mergedProductsInfo;
  }