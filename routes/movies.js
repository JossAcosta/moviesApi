const express = require('express');
// const { moviesMock } = require('../utils/mocks/movies');
const MoviesService = require('../services/movies');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get("/", async function(req, res, next) {
        const { tag } = req.query;
        try {
            const movies = await moviesService.getMovies({ tag });

            res.status(200).json({
                data:movies,
                message:'movies listed'
            });
        }catch (err) {
            next(err);
        }
    });
    router.get("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        try {
            const movie = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data:movie,
                message:'movie retrieved'
            });
        }catch (err) {
            next(err);
        }
    });
    router.post("/", async function(req, res, next) {
        const { body: movie } = req;
        try {
            const createdMovie = await moviesService.cretateMovie({ movie });

            res.status(201).json({
                data:createdMovie,
                message:'movie created'
            });
        }catch (err) {
            next(err);
        }
    });
    router.put("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const updatedMovie = await moviesService.updateMovie({ movieId, movie});

            res.status(200).json({
                data:updatedMovie,
                message:'updated movie'
            });
        }catch (err) {
            next(err);
        }
    });
    router.delete("/:movieId", async function(req, res, next) {
        try {
            const deletedMovie = await Promise.resolve(moviesMock[0].id);

            res.status(200).json({
                data:deletedMovie,
                message:'deleted movie'
            });
        }catch (err) {
            next(err);
        }
    });
}

module.exports = moviesApi;