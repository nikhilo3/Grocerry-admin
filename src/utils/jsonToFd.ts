export const jsonToFd = <T extends Record<string, any>>(
  json: T,
  parentKey?: string
): FormData => {
  const formData = new FormData();
  Object.entries(json).forEach(([key, value]) => {
    if (key === "documents") {
      value.forEach((file: any) => {
        formData.append("documents", file);
      });
      return;
    }
    const fullKey = parentKey ? `${parentKey}[${key}]` : key;
    if (!value) return;
    if (typeof value === "object" && !Array.isArray(value)) {
      const nestedFormData = jsonToFd(value, fullKey);
      nestedFormData.forEach((nestedValue, nestedKey) => {
        formData.append(nestedKey, nestedValue);
      });
    } else if (Array.isArray(value)) {
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

  return formData;
};
