const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../schema/schema");
const NumberSchema = require("../schema/numberSchema");
require("../db/db");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    console.log("try");
    const { userName, password } = req.body;
    const check = await Users.findOne({ userName });
    if (check != null) {
      console.log("user already exists");
      res.status(409).json({ success: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = new Users({
        userName: userName,
        password: hashedPassword,
      });

      const saved = await user.save();
      if (saved) {
        console.log("user registered");
        const obj = await Users.findOne({ userName: userName });
        res.status(200).json({ success: true, id: obj._id });
      } else {
        console.log("user not registered");
        res.status(500).json({ success: false });
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.userName);
    console.log(req.body.password);
    const check = await Users.findOne({ userName: req.body.userName });

    if (await bcrypt.compare(req.body.password, check.password)) {
      console.log("user exists");
      res.status(200).json(check);
    } else {
      console.log("user doesn't exists");
      res.status(500).json({ success: false });
    }
  } catch (e) {
    console.log("user doesn't exists");
    res.status(500).json({ success: false });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { phone, name } = req.body;

    const { id } = req.params;

    const phoneName = await NumberSchema.updateOne(
      { uid: id },
      {
        $push: {
          numberNames: { phone: phone, name: name },
        },
      },
      { upsert: true }
    );
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const numbers = await NumberSchema.findOne({ uid: id });
    res.status(200).json(numbers);
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
