const workoutModel = require('../models/workoutSchema')
const mongoose = require('mongoose')

//get all workout for specific user
const workout_getAll = (async(req, res) => {

    const user_id = req.user._id

    const workouts = await workoutModel.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(workouts)
})

//get a speicifc workout for a specific user
const workout_getOne = (async(req, res) => {
    const { id } = req.params
    console.log(req.params)
    const user_id = req.user._id

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

//create a new workout in database for the user
const workout_create = ((req, res) => {
    const { title, reps, load } = req.body
    const user_id = req.user._id

    workoutModel.create({title, load, reps, user_id})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json({error: err.message})
        })
})

//deletes a workout in database for the user
const workout_delete = (async(req, res) => {
    const { id } = req.params

    const workout = await workoutModel.findByIdAndDelete(id)

    if (!workout) {
        res.status(400).json({error: e.message})
    } else {
        res.status(200).json(workout)
    }
})

//updates a workout for the user
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