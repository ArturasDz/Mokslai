const { createTicket } = require("../models/appModel");
const AppError = require("../utils/appError");
const QRCode = require("qrcode");

exports.postTicket = async (req, res, next) => {
  try {
   const ticket = req.body;
   const qCode = await QRCode.toDataURL(JSON.stringify(ticket));
   const createdTicket = await createTicket(ticket);
   res.status(201).json({
    status: "success",
    qrCode: qCode, 
    data: createdTicket});
  } catch (error) {
    next(error);
  }
};