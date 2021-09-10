const express = require("express");
const router = new express.Router();
const db = require("../db/index");

router.post("/api/favoriet_movie", async (req, res) => {
  const {
    user_id,
    title,
    poster,
    backdrop,
    rating,
    description,
    releaseDate,
    genres,
  } = req.body;
  try {
    const favoriet = await db.query(
      "INSERT INTO favoriet_movie ( user_id, title,poster,backdrop,rating,description,releaseDate,genres) values ($1, $2, $3, $4 ,$5 ,$6 ,$7 ,$8) returning *",
      [
        user_id,
        title,
        poster,
        backdrop,
        rating,
        description,
        releaseDate,
        genres,
      ]
    );

    console.log(favoriet.rows[0]);

    res.status(200).json({
      status: "success",
      results: favoriet.rows.length,
      favoriet: favoriet.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/favoriet_movie/:userId", async (req, res) => {
  try {
    const favoriet = await db.query(
      `SELECT * from favoriet_movie where user_id = $1`,
      [req.params.userId]
    );

    console.log(favoriet.rows[0]);

    res.status(200).json({
      status: "success",
      results: favoriet.rows.length,
      favoriet: favoriet.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/api/favoriet_movie/:favorietId", async (req, res) => {
  try {
    const favoriet = await db.query(
      `delete from favoriet_movie where id = $1 returning *`,
      [req.params.favorietId]
    );

    console.log(favoriet.rows[0]);

    res.status(200).json({
      status: "success",
      results: favoriet.rows.length,
      favoriet: favoriet.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
