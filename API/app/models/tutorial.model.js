const sql = require("./db.js");
// constructor
const Tutorial = function(tutorial) {
  this.produto= tutorial.produto;
  this.descricao = tutorial.descricao;
  this.preco = tutorial.preco;
};
Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO produtos SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created produto: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};
Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM produtos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found produto: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

//GET por ordem Alfabética
Tutorial.getAll = (title, result) => {
  let query = "SELECT * FROM produtos ORDER BY produto";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tutorials: ", res);
    result(null, res);
  });
};

//GET Mais Caro
Tutorial.getExp = (title, result) => {
  let query = "SELECT * FROM produtos ORDER BY preco DESC";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tutorials: ", res);
    result(null, res);
  });
};

//GET mais barato
Tutorial.getCheap = (title, result) => {
  let query = "SELECT * FROM produtos ORDER BY preco";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tutorials: ", res);
    result(null, res);
  });
};



// Tutorial.getAllPublished = result => {
//   sql.query("SELECT * FROM produtos WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };
Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE produtos SET produto = ?, descricao = ?, preco = ? WHERE id = ?",
    [tutorial.produto, tutorial.descricao, tutorial.preco, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated produto: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};
Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM produtos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted produto with id: ", id);
    result(null, res);
  });
};
Tutorial.removeAll = result => {
  sql.query("DELETE FROM produtos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} produto`);
    result(null, res);
  });
};
module.exports = Tutorial;