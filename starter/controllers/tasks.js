const Task = require('../models/task')
const getAllTasks = async (req, res)=>{
    // res.send('Here are all the tasks you should perform today...')
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
    catch (error) {
        res.status(500).json({msg:error})
    }
}

const createTask = async (req, res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getTask = async (req, res)=>{
    // res.json({id:req.params.id})
    try {
        const taskID = req.params.id
        const task = await Task.findOne({_id:taskID }).exec()
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }

}

const updateTask = async (req, res)=>{
    // res.send('Update Task')
    try {
        const taskID = req.params.id
        const data = req.body
        const task = await Task.findByIdAndUpdate({_id:taskID}, data, {
            new: true,
            runValidators: true
        })
        
        
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }

        res.status(200).json({task}) 
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask = async (req, res)=>{
    // res.send('Delete Task')
    try {
        const taskID = req.params.id
        const task = await Task.findByIdAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        res.status(200).json({task})
    }
    catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}