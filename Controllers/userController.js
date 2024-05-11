const express = require('express');
const userService = require('../Services/userService');

const userController = express.Router()



/*************** Login *************/
userController.post("/login", async (req, res, next) => {
    try {
      const { user }= await userService.login(
        req.body.email,
        req.body.motDePasse
      );
      res.status(200).json({ user });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
});

/*************** Sign up *************/
userController.post("/signup", async (req, res, next) => {
    try {
      const { user }= await userService.signup(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.NUmeroTel,
        req.body.motDePasse,
        req.body.PhotoUser,
      );
      res.status(200).json({ user });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
});


module.exports = userController;
