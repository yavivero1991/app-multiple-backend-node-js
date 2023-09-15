const { encrypt, compare } = require("../utils/handleJwt");
const { handleHttpError, handleErrorResponse} = require("../utils/handleError");
const { tokenSign, decodeSign, verifyToken } = require("../utils/handleToken");
const { userModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleCleanUser } = require("../utils/handleCleanUser");


const loginController = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await userModel.findOne({ email: body.email });
    
    if (!user) {
      handleErrorResponse(res, "USER_PASSWORD_INVALID", 404);
      return;
    }

    const checkPassword = await compare(body.password, user.password);

    if (!checkPassword) {
      handleErrorResponse(res, "USER_PASSWORD_INVALID", 402);
      return;
    }

    handleCleanUser(user)
    const tokenJwt = await tokenSign(user);

    const data = {
      token: tokenJwt,
      user: user
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const registerController = async (req, res) => {
  try {
    const body = matchedData(req);
    
    const checkIsExist = await userModel.findOne({ email: body.email });
    if (checkIsExist) {
      handleErrorResponse(res, "EMAIL_EXISTS", 401);
      return;
    }
    
    const password = await encrypt(body.password);
    const bodyInsert = { ...body, password };
    const userCreated = await userModel.create(bodyInsert)
    
    handleCleanUser(userCreated)

    const data = {
      token: await tokenSign(userCreated),
      user: userCreated
    }

    res.send({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = { loginController, registerController };
