const appointmentModel = require("../models/appointmentModel");
const AppError = require("../utils/appError");

// GET ALL APPOINTMENTS WITH PAGINATION
exports.getAllAppointments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid page or limit value"
      });
    }

    const appointments = req.user.role === "admin"
      ? await appointmentModel.getAllForAdmin(limit, offset)
      : await appointmentModel.getAllForUser(req.user.id, limit, offset);

    res.status(200).json({
      status: "success",
      results: appointments.data.length,
      total: appointments.total,
      data: appointments.data
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// GET APPOINTMENT BY ID
exports.getAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return next(new AppError("Invalid appointment ID", 400));
    }

    const appointment = req.user.role === "admin"
      ? await appointmentModel.getByIdAdmin(id)
      : await appointmentModel.getByIdUser(id, req.user.id);

    if (!appointment) {
      return next(new AppError("Appointment not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: appointment
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// GET APPOINTMENTS BY DATE RANGE
exports.getAppointmentsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(new AppError("Please provide start and end dates", 400));
    }

    const appointments = req.user.role === "admin"
      ? await appointmentModel.getByDateRangeAdmin(startDate, endDate)
      : await appointmentModel.getByDateRangeUser(req.user.id, startDate, endDate);

    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// CREATE APPOINTMENT
exports.createAppointment = async (req, res, next) => {
  try {
    const { pet_name, username, date, time, notes } = req.body;

    if (!pet_name || !username || !date || !time || !notes) {
      return next(new AppError("Please provide all required fields", 400));
    }
    const appointment = await appointmentModel.create(pet_name, username, date, time, notes);
    res.status(201).json({
      status: "success",
      data: appointment
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// UPDATE APPOINTMENT
exports.updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, notes, status, rating } = req.body;

    if (!id || isNaN(id)) {
      return next(new AppError("Invalid appointment ID", 400));
    }

    const appointment = req.user.role === "admin"
      ? await appointmentModel.updateByAdmin(id, date, notes, status)
      : await appointmentModel.updateByUser(id, req.user.id, date, notes, rating);

    if (!appointment) {
      return next(new AppError("Appointment not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      data: appointment
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return next(new AppError("Invalid appointment ID", 400));
    }

    const result = req.user.role === "admin"
      ? await appointmentModel.deleteByAdmin(id)
      : await appointmentModel.deleteByUser(id, req.user.id);

    if (!result) {
      return next(new AppError("Appointment not found or unauthorized", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Appointment deleted successfully"
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};