import express from "express";
import {
  getAllStudents,
  getAllManagers,
  updateStudent,
  updateManager,
  getManagerById,
  getStudentById,
  getNoOfManagers,
  getNoOfStudents,
  getAllActiveManagers,
  getStudentByDegShort,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getAllStudents", getAllStudents);
router.get("/getAllManagers", getAllManagers);

router.get("/getAllActiveManagers", getAllActiveManagers);

router.post("/getManagerById", getManagerById);
router.post("/getStudentById", getStudentById);

router.put("/updateStudent", updateStudent);
router.put("/updateManager", updateManager);

router.get("/getNoOfManagers", getNoOfManagers);
router.get("/getNoOfStudents", getNoOfStudents);

router.post("/getStudentByDegShort", getStudentByDegShort);

export default router;
