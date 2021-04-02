export const formatDate = (value: string) => {
  return new Date(value)
    .toISOString()
    .replace(/T.*/, '')
    .split('-')
    .reverse()
    .join('/');
};

export default formatDate;
