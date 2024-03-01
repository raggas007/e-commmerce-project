export const validateReqBody = (validationSchema) => {
  return async (req, res, next) => {
    //validate login credentials
    try {
      const validatedData = await validationSchema.validate(req.body);

      req.body = validatedData;

      //call next function
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  };
};
