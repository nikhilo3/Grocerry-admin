const objToQuery = (obj: Record<string, string | number | boolean | null>) => {
  return Object.keys(obj)
    .map((key) => {
      if (obj[key] === null || obj[key] === undefined) return null;
      // url encode key and value
      const encodedValue = encodeURIComponent(String(obj[key]));
      return `${key}=${encodedValue}`;
    })
    .filter((item) => item)
    .join("&");
};
export default objToQuery;
