/**
 * Converts a JSON object to FormData.
 * @param json The JSON object to convert.
 * @returns The converted FormData object.
 */
export const jsonToFd = <T extends Record<string, any>>(json: T): FormData => {
  const formData = new FormData();
  Object.entries(json).forEach(([key, value]) => {
    if (!value) return;
    if (typeof value === "object") {
      // run the function recursively
      const nestedFormData = jsonToFd(value);
      nestedFormData.forEach((nestedKey, nestedValue) => {
        formData.append(`${key}[${nestedKey}]`, nestedValue);
      });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // run the function recursively
        const nestedFormData = jsonToFd(item);
        nestedFormData.forEach((nestedKey, nestedValue) => {
          formData.append(`${key}[${index}][${nestedKey}]`, nestedValue);
        });
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
