import { json } from 'express'
import {Todo} from '../models/todo.js'
import { fileManager } from "../utils/files.js"

class todoController {
    constructor(){
        this.initTodos()  
    } 

    async createTodo(req, res){
        // The post req data
        const task = req.body.task

        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)

        //  Save data to file
        await fileManager.writeFile('./data/todos.json', this.TODOS)


        res.json({
            message: 'Created the new todo object',
            newTask: newTodo
        
        })
    }

    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')

        if (todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = []
        }
    }


    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    async updateTodo(req, res){
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
        // Write the updated todo into json file
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        // Show the updated info
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex],
        })
    }

    async deleteTodo(req, res) {
        // Getting the id
        const taskId = req.params.id;
        const taskbody = req.params.body

        const taskIndex = this.TODOS.findIndex((todo) => todo.id === taskId); 
    
        if (taskIndex < 0) {
            throw new Error('Couldnt find todo!!!');
            res.json({message: 'Could not find todo with such index!'});

        }
        const deletedTask = this.TODOS.splice(taskIndex, 1)[0]
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'Todo deleted',
            deleteTodo: deletedTask,

        })

    }
}   


export const TodoController = new todoController()