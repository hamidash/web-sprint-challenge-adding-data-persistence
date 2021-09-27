const router = require("express").Router();
const projectDb = require("./model");

router.get("/", (req, res) => {
  projectDb
    .getAll()
    .then((projects) => {
      const allProjects = projects.map((project) => {
        return {
          ...project,
          project_completed: project.project_completed ? true : false,
        };
      });
      res.status(200).json(allProjects);
    })
    .catch((err) =>
      res.status(500).json({ message: `Couldn't get all projects. ${err}` })
    );
});

router.post("/", async (req, res) => {
  let { project_name, project_description, project_completed } = req.body;

  // if project_name is missing, then respond with error and exit the function
  if (!project_name) {
    res
      .status(400)
      .json({ message: `BAD Request: missing project_name field` });
    return;
  }

  //make sure to send db "project_completed as false" if req.body is missing that field
  if (!project_completed) {
    project_completed = false;
  }

  // save required object to be sent to db to a variable
  const newProject = { project_name, project_description, project_completed };

  // insert the object to db and save its response to a varaible
  const newProjectId = await projectDb.create(newProject);

  // condition to check if insert was successful or not
  if (newProjectId.length > 0) {
    //successfull insert call the db to get the object with a sepcific project_id
    projectDb
      .getById(newProjectId[0])
      // if a speicific object with given id exists then return an object where completed field is boolean
      .then((project) => {
        const newProject = {
          ...project,
          project_completed: project.project_completed ? true : false,
        };
        res.status(201).json(newProject);
      })
      // if object with a given id isn't found then return error
      .catch((err) =>
        res
          .status(500)
          .json({
            message: `Couldn't retrieve new project id ${newProjectId[0]} ${err}`,
          })
      );
  } else {
    // if creating new object fails (or newProjectId array is empty) then return error
    res.status(500).json({ message: `Couldn't create new project` });
  }
});

module.exports = router;
