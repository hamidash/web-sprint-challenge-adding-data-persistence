const router = require("express").Router();
const tasksDb = require("./model");
const projectsDb = require('../project/model')

router.get("/", (req, res) => {
  tasksDb
    .getAll()
    .then((tasks) => {
      const allTasks = tasks.map((task) => {
        return {
          ...task,
          task_completed: task.task_completed ? true : false,
        };
      });
      res.status(200).json(allTasks);
    })
    .catch((err) => {
      res.status(500).json({ message: `Couldn't get all tasks. ${err}` });
    });
}); 



router.post('/', async (req, res) => {
  let {task_description, project_id, task_notes, task_completed} = req.body;

  if(!task_description || !project_id){
      res.status(400).json({message: `BAD Request: missing task_description or project_id`})
      return;
  }

  const allProjects = await projectsDb.getAll();

  const idMatch = allProjects.find(project => project.project_id === project_id)

  if(!idMatch){
      res.status(400).json({message: `BAD Request: project_id ${project_id} can't be found`})
      return;
  }

  if(!task_completed){
      task_completed = false;
  }

  const newTask = {task_description, project_id, task_notes, task_completed}

  const newTaskId = await tasksDb.create(newTask)

  if(newTaskId.length>0){
     tasksDb.getById(newTaskId[0])
     .then(task=> {
       const newTask = {...task, task_completed: task.task_completed ? true : false }
       res.status(201).json(newTask)
     })
     .catch(err=> res.status(500).json({message: `Can't retrieve a new task with id ${newTaskId[0]}. ${err}`}))
  }else{
      res.status(500).json({message: `Couldn't create a new task`})
  }

})



module.exports = router;