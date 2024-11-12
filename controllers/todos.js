import {Todo} from '../models/todo.js'

class todoController {
    constructor(){
        this.TODOS = []  
    } 

    createTodo(req, res){
        // The post req data
        const task = req.body.task

        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)

        res.json({
            message: 'Created the new todo object',
            newTask: newTodo
        
        })
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    updateTodo(req, res){
        // Getting id from url params
        const todoId = req.params.id
        // Getting the updated name for req
        const updatedTask = req.body.task
        // Check if array element index of todo id is equal
        const todoIndex = this.TODOS.findIndex((todo) => todo.id == todoId)

        if (todoIndex < 0) {
            throw new Error('Couldnt find todo!!!!')
            res.json({
                message: 'Could not find todo with such index!'
            })
        }

        // Updated code if correct
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
        // Show the updated info
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex]

        })
    }
}   


export const TodoController = new todoController()