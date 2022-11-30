const express = require('express')
const { workout_create, 
        workout_getAll,
        workout_getOne,
        workout_update,
        workout_delete } = require('../controller/workoutContollers.js')
const router = express.Router()

//get all workouts
router.get('/', workout_getAll)

//get a specific workout
router.get('/:id', workout_getOne)

//POST  new workout
router.post('/', workout_create)

//delete a workout
router.delete('/:id', workout_delete)

//update a workout
router.patch('/:id', workout_update)

module.exports = router