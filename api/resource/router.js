const router = require("express").Router();
const resourcesDb = require("./model");

router.get("/", (req, res) => {
  resourcesDb
    .getAll()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch((err) => {
      res.status(500).json({ message: `Couldn't get all resources. ${err}` });
    });
});

router.post("/", async (req, res) => {
  const { resource_name, resource_description } = req.body;

  const allResources = await resourcesDb.getAll();

  const duplicateName = allResources.find(
    (resource) => resource_name === resource.resource_name
  );

  if (duplicateName) {
    res
      .status(400)
      .json({
        message: `BAD Request: resource_name ${resource_name} already exists`,
      });
    return;
  }

  const newResource = { resource_name, resource_description };

  const newResourceId = await resourcesDb.create(newResource);

  if (newResourceId.length > 0) {
    resourcesDb
      .getById(newResourceId[0])
      .then((resource) => {
        res.status(201).json(resource);
      })
      .catch((err) => {
        res.status(500).json({
          message: `Couldn't retrieve new project id ${newResourceId[0]} ${err}`,
        });
      });
  } else {
    res.status(500).json({ message: `Couldn't create new resource` });
  }
});

module.exports = router;
