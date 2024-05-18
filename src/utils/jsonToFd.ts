export const jsonToFd = <T extends Record<string, any>>(
  json: T,
  parentKey?: string
): FormData => {
  console.log(json);
  const formData = new FormData();
  Object.entries(json).forEach(([key, value]) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (!value) return;

    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedFormData = jsonToFd(value, fullKey);
      nestedFormData.forEach((nestedValue, nestedKey) => {
        formData.append(nestedKey, nestedValue);
      });
    } else if (Array.isArray(value)) {

      // if (key === "documents") {
      //   // append the documents to the formData
      //   value.forEach((item, itemIndex) => {
      //     formData.append(key, item);
      //   });
      // }

      value.forEach((item, itemIndex) => {
        const nestedFormData = jsonToFd(item, `${fullKey}[${itemIndex}]`);
        nestedFormData.forEach((nestedValue, nestedKey) => {
          formData.append(nestedKey, nestedValue);
        });
      });
    } else {
      formData.append(fullKey, value);
    }
  });
  console.log(formData);
  return formData;
};
