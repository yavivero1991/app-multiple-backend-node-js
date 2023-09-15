const handleHttpError = (res, error) => {
  console.log("handleHttpError => ", error);
  res.status(500);
  res.send({ error: "ERROR", type: error });
};

const handleErrorResponse = (res, message = "Algo ocurrio", code = 401) => {
  console.log("handleErrorResponse => ", message);
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError, handleErrorResponse };
