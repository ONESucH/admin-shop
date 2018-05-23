const express = require('express'),   
    router = express.Router(),  
    mongoose = require('mongoose'),     
    UserModelRegistration = require('../models/user-model');

router.get('/', (req, res, next) => {
    UserModelRegistration.find((err, products) => {
        if (err) return next(err);
        res.json(products);
    });
});

router.get('/:id', (req, res, next) => { // получить по id
    UserModelRegistration.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', (req, res, next) => {
    UserModelRegistration.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/:id', (req, res, next) => { // поиск по id
    UserModelRegistration.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', (req, res, next) => { // поиск по id
    UserModelRegistration.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
