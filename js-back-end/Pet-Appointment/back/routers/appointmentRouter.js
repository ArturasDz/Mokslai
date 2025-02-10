const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const { protect, allowAccessTo } = require("../controllers/authController");

const {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDateRange
} = appointmentController;

const appointmentRouter = express.Router();

// Apsaugome visus routes su protect middleware
appointmentRouter.use(protect);

// Routes
appointmentRouter
  .route("/")
  .get(getAllAppointments)
  .post(createAppointment);

appointmentRouter
  .route("/date-range")
  .get(getAppointmentsByDateRange);

appointmentRouter
  .route("/:id")
  .get(getAppointment)
  .patch(updateAppointment)
  .delete(deleteAppointment);

// Admin only routes
appointmentRouter
  .route("/admin/all")
  .get(allowAccessTo("admin"), getAllAppointments);

appointmentRouter
  .route("/admin/:id")
  .patch(allowAccessTo("admin"), updateAppointment)
  .delete(allowAccessTo("admin"), deleteAppointment);

module.exports = appointmentRouter;