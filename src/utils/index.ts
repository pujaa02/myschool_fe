export const customRandomNumberGenerator = (max?: number | null) => {
  if (max) {
    return Math.floor(Math.random() * max) + 1;
  }
  return Math.floor(Math.random() * 10000000) + 1;
};

export const generateFirstLetter = (name: string | undefined) => {
  return name ? name.trim().slice(0, 1).toUpperCase() : '';
};

export const dasherize = (str: string) => {
  return str
    ?.trim()
    .split(' ')
    .map((value) => value.toLowerCase())
    .join('-');
};

export const convertLocationIdToName = (
  type: string,
  value: string,
  countries: { countries: { id: string; name: string }[] },
  states: { states: { id: string; name: string; country_id: string }[] },
  cities: { cities: { id: string; name: string; state_id: string }[] }
) => {
  switch (type) {
    case 'country':
      return countries.countries.find((obj) => obj.id === value)?.name ?? value;
    case 'state':
      return states.states.find((obj) => obj.id === value)?.name ?? value;
    case 'city':
      return cities.cities.find((obj) => obj.id === value)?.name ?? value;
    default:
      return '';
  }
};



export const convertRoleToUrl = (inputString: string) => {
  return inputString
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim()
    .split(' ')
    .join('-');
};

