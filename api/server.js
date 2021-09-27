const express = require('express');
const projectRouter = require('./project/router');
const resourcesRouter = require('./resource/router');
const tasksRouter = require('./task/router');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter)
server.use('/api/resources', resourcesRouter)
server.use('/api/tasks', tasksRouter)

server.get('/', (req, res)=> {
    res.send('<h2>Server is running, call projects, resources or tasks to get data</h2>')
})


module.exports = server;