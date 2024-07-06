export const groupByCode = (orders: any[]): any => {
  const grouped: { [key: string]: any } = {};
  let codes = orders.map((e: any) => e.codigo);

  let a = codes.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  let repetidos = Object.keys(a).filter((value) => a[value] > 1);

  let lista_repetidos = repetidos.map((codigo) => {
    return {
      [codigo]: orders.filter((item) => item.codigo === codigo),
    };
  });

  let repetidos_info = {
    repetidos_amount: repetidos,
    lista_repetidos,
  };
  return repetidos_info;
};
