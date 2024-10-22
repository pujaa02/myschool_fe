export const generateFirstLetter = (name: string | undefined) => {
  return name ? name.trim().slice(0, 1).toUpperCase() : '';
};
