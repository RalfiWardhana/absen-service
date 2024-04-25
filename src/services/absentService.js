const absentModel = require('../models/absentModel');

exports.getAbsents = async () => {
  return absentModel.getAbsents();
};

exports.getAbsentsWithDate = async( startDate, endDate) => {
  return absentModel.getAbsentsWithDate(startDate, endDate);
}

exports.getAbsentById = async (id) => {
  return absentModel.getAbsentById(id);
};

exports.getAbsentByUserId = async (userId) => {
  return absentModel.getAbsentByUserId(userId);
};

exports.getAbsentByUserIdWithDate = async(userId, startDate, endDate) => {
  return absentModel.getAbsentByUserIdWithDate(userId, startDate, endDate);
}

exports.createAbsent = async (absent) => {
  return absentModel.createAbsent(absent);
};

exports.updateAbsent = async (id, absent) => {
  return absentModel.updateAbsent(id, absent);
};

exports.deleteAbsent = async (id) => {
  return absentModel.deleteAbsent(id);
};