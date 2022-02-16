// Class: DAAA/FT/1B/04
// Name: Subathra Sundarbabu
// Admin no.: P2100845

const db = require("./databaseConfig");

module.exports = {
  // sp_it: product.insert(callback)
  insert: function (post, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const insertQuery = `
                INSERT INTO product (name,description,price,discount,image)
                VALUES
                (?, ?, ?,?,?);
            `;
        dbConn.query(
          insertQuery,
          [
            post.brand_name,
            post.description,
            post.price,
            post.discount,
            post.path,
          ],
          (error, results) => {
            dbConn.end();
            if (error) {
              //   console.log(error);
              return callback(error, null);
            } else {
              return callback(null, results.insertId);
            }
          }
        );
      }
    });
  },
  // sp_it: product.findByID(callback)
  findByID: function (id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findproductByIDQuery = `
                SELECT 
                *
                FROM product
                WHERE id = ?
                ;`;
        dbConn.query(findproductByIDQuery, [id], (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          } else if (results.length == 0) {
            return callback(null, null);
          } else {
            // console.log(results);
            return callback(null, results);
          }
        });
      }
    });
  },
  // sp_it: product.delete(callback)
  delete: function (id, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const deletePostQuery = `
                    DELETE FROM product
                    WHERE productid = ?
                `;
        dbConn.query(deletePostQuery, id, (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  },
  findAll: function (callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const findAllUsersQuery = `SELECT * FROM product;`;
        dbConn.query(findAllUsersQuery, (error, results) => {
          if (error) {
            return callback(error, null);
          } else if (results.length == 0) {
            return callback(null, null);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  },
  searchByName: function (name, callback) {
    var dbConn = db.getConnection();
    dbConn.connect(function (err) {
      if (err) {
        //database connection gt issue!
        console.log(err);
        return callback(err, null);
      } else {
        const searchByNameQuery =
          "SELECT name,brand,price FROM product WHERE name LIKE ?;";
        dbConn.query(searchByNameQuery, [name], (error, results) => {
          dbConn.end();
          if (error) {
            return callback(error, null);
          } else if (results.length == 0) {
            return callback(null, null);
          } else {
            console.log(results);
            return callback(null, results);
          }
        });
      }
    });
  },
};
