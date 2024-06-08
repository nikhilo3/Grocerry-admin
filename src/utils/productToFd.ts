export const productToFd = (product: any) => {
  const fd = new FormData();
  Object.keys(product).map((key) => {
    // if (key === "subCategory2") return;
    if (key === "productUrls") return;
    if (key === "documents") {
      // if the documents is empty array skip the iteration
      if (product.documents.length === 0) return;
      else {
        product.documents?.map((doc: File, index: number) => {
          if (typeof doc === "string") return;
          fd.append(`${key}[${index}]`, doc);
        });
      }
    }
    if (key === "varietyList") {
      product[key].map((item: any, index: number) => {
        Object.keys(item).map((itemKey) => {
          if (itemKey === "documents" || itemKey === "documentUrls") {
            item[itemKey].map((doc: File, docIndex: number) => {
              if (typeof doc === "string") {
                return;
              }
              fd.append(`${key}[${index}].${"documents"}[${docIndex}]`, doc);
            });
          } else {
            fd.append(`${key}[${index}].${itemKey}`, item[itemKey]);
          }
        });
      });
    } else {
      if (key === "documents") return;
      fd.append(key, product[key]);
    }
  });
  return fd;
};
