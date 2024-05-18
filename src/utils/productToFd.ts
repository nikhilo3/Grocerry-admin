export const productToFd = (product: any) => {
  console.log(product);
  const fd = new FormData();
  Object.keys(product).map((key) => {
    if (key === "varietyList") {
      product[key].map((item: any, index: number) => {
        Object.keys(item).map((itemKey) => {
          if (itemKey === "documents" || itemKey === "documentUrls") {
            // item[itemKey].map((doc: File, docIndex: number) => {
            //   fd.append(`${key}[${index}].${"documents"}[${docIndex}]`, doc);
            // });
          } else {
            fd.append(`${key}[${index}].${itemKey}`, item[itemKey]);
          }
        });
      });
    } else {
      fd.append(key, product[key]);
    }
  });
  return fd;
};
