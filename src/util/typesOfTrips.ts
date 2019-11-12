
export const typesOfTrips = (type: String) => {
  const options: Array<String> = ["Walk", "Sea", "Experience"];
  return options.includes(type);
}