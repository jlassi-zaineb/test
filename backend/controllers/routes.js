const express = require('express')
const router = express.Router();
const { Teacher, Student, Game, History } = require('../model/Schemas.js')

// ROUTE DISPLAY + ADD + DELETE STUDENTS
router.route('/api/students')

    .get(async (req, res) => {
        try {
            const students_list = await Student.find({})
            console.log(students_list)
            res.json(students_list)
        } catch (error) {
            res.json({ success: false, payload: error })
        }
    })
    .post(async (req, res) => {
        try {
            const bodyRequest = req.body
            const newStudent = new Student(bodyRequest)
            const student = await newStudent.save();
            res.json({ success: true, payload: `${student} is added to Students' Collection` })
        } catch (error) {
            if (error.code === 11000) {
                res.json({ success: false, payload: 'Student exists' })
            } else {
                res.json({ success: false, payload: error })
            }
        }
    })

router.delete('/api/students/:id', async (req, res) => {
    try {
        const studentToDelete = req.params.id
        await Student.deleteOne({ _id: studentToDelete }).exec()
        res.json({ success: true, payload: `${studentToDelete} Got a DELETE request !` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, payload: error })
    }
})


// Get data game and save HISTORY in child ID
router.post('/api/history', async (req, res) => {
    const getGameData = req.body
    const newGameData = new History(getGameData)
    try {
        const gameData = await newGameData.save();
        res.json({ success: true, payload: `${gameData} is added to Histories` })
    } catch (error) {
        res.json({ success: false, payload: error })
    }
})


// Find One Child and display his history (POPULATE)
router.get('/api/history', async (req, res) => {
    try {
        //const { student } = req.query // const student = req.query.student
        const data = await History.find(req.query).exec()
        res.json({ success: true, payload: data })
    } catch (error) {
        res.json({ success: false, payload: error })
    }
})


module.exports = router