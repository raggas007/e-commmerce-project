export const getFullName = (firstName, lastName) => {
  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");

  return `${firstName} ${lastName}`;
};
