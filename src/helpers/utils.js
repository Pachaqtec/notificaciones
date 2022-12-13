const caculateAge = fechanacimiento => {
  const birthDate = fechanacimiento.split('-');

  const dateCurrent = new Date();
  const yearCurrent = parseInt(dateCurrent.getFullYear());
  const monthCurrent = parseInt(dateCurrent.getMonth());
  const dayCurrent = parseInt(dateCurrent.getDay());

  const year = parseInt(birthDate[0]);
  const month = parseInt(birthDate[1]);
  const day = parseInt(birthDate[2]);

  let age = yearCurrent - year;

  if (monthCurrent < month) age--;
  else if (monthCurrent === month) {
    if (dayCurrent < day) age--;
  }

  return age;
};

module.exports = { caculateAge };
