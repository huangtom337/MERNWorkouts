const workoutModel = require('../models/workoutSchema')
const mongoose = require('mongoose')

const workout_getAll = (async(req, res) => {
    // workoutModel.find()
    //     .then(result => {
    //         res.status(200).json(result)
    //     })
    //     .catch(err => {
    //         res.status(400).json({ error: err.message })
    //     })
    
    const workouts = await workoutModel.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
})

const workout_getOne = (async(req, res) => {
    // const id = req.params.id
    const { id } = req.params

    // try {
    //     const workout = await workoutModel.findById(id)
    //     res.status(200).json(workout)
    // } catch (e) {
    //     res.status(400).json({error: e.message})
    // }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await workoutModel.findById(id)

    if (!workout) {
        res.status(400).json({error: e.message})
    } else {
        res.status(200).json(workout)
    }

})

const workout_create = ((req, res) => {
    // const { title, reps, load } = req.body

    // try {
    //     const workout = await workoutModel.create({
    //         title, load, reps
    //     })
    //     res.status(200).json(workout)
    // } catch (e) {
    //     res.status(400).json({error: e.message})
    // }

    workoutModel.create(req.body)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json({error: err.message})
        })
})

const workout_delete = (async(req, res) => {
    const { id } = req.params

    const workout = await workoutModel.findByIdAndDelete(id)

    if (!workout) {
        res.status(400).json({error: e.message})
    } else {
        res.status(200).json(workout)
    }
})

const workout_update = (async(req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await workoutModel.findByIdAndUpdate(id, {new: true}, {
        ...req.body
    })

    console.log(workout)
    if (!workout) {
        res.status(400).json({error: e.message})
    } else {
        res.status(200).json(workout)
    }
})

module.exports = {
    workout_create,
    workout_getAll,
    workout_getOne,
    workout_delete,
    workout_update
}