const database = require('../configs/database');
const mysql = require('mysql2');

const pool = mysql.createPool(database);

exports.getAbsents = async () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM absents', (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

exports.getAbsentsWithDate = async (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM absents WHERE check_in BETWEEN ? AND ?', [startDate, endDate], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

exports.getAbsentById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM absents WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

exports.getAbsentByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM absents WHERE userId = ?', [userId], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results); // Mengembalikan semua hasil, bukan hanya results[0]
    });
  });
};

exports.getAbsentByUserIdWithDate = async (userId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM absents WHERE userId = ? AND check_in BETWEEN ? AND ?', [userId, startDate, endDate], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

exports.createAbsent = async (absent) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO absents SET ?', absent, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.insertId);
    });
  });
};

exports.updateAbsent = async (id, absent) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE absents SET ? WHERE id = ?', [absent, id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.affectedRows);
    });
  });
};

exports.deleteAbsent = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM absents WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.affectedRows);
    });
  });
};