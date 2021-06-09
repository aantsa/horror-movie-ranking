const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');

//gets all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Movie.find();
        res.json(posts);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

//submits a post
router.post('/', async (req, res) => {
    const post = new Movie({
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        length: req.body.length,
        imbdRating: req.body.imbdRating,
        suspense: req.body.suspense,
        gore: req.body.gore,
        spookiness: req.body.spookiness,
        imageURL: req.body.imageURL
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({
            message: err
        });
    }

});

//get back specific post
router.get('/:name', async (req, res) => {
    try {
        const singleMovie = await Movie.find({
            name: req.params.name
        });
        res.json(singleMovie);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

// delete a specific post
router.delete('/:name', async (req, res) => {
    try {
        const removedMovie = await Movie.remove({
            name: req.params.name
        });
        res.json(removedMovie);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

//update post
router.patch('/:name', async (req, res) => {
    try {
        const updatedMovie = await Movie.updateOne({
            name: req.params.name
        }, {
            $set: {
                name: req.body.name,
                description: req.body.description,
                releaseDate: req.body.releaseDate,
                length: req.body.length,
                imbdRating: req.body.imbdRating,
                suspense: req.body.suspense,
                gore: req.body.gore,
                spookiness: req.body.spookiness,
                imageURL: req.body.imageURL
            }
        });
        res.json(updatedMovie);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;