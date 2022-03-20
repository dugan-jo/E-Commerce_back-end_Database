const router = require('express').Router();
const { redirect } = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// 
// 
// 
/////////////////////////
//                     //
//    FIND ALL TAGS    //
//                     //
/////////////////////////
// GET -> -> -> http://localhost:3001/api/tags <- <- <- GET //
router.get('/', async (req, res) => {
  const getTags = await Tag.findAll({
    attributes:['id'],
    include: [{
      model: Product,
      through: ProductTag
    }]
  }) .then(getTags =>res.json(getTags))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
});
})
// 
// 
// 
///////////////////////////////////
//                               //
//    FIND A SINGLE TAG BY ID    //
//                               //
///////////////////////////////////
// GET -> -> -> http://localhost:3001/api/tags/{ID} <- <- <- GET //
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    } 
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// 
// 
// 
////////////////////////////
//                        //
//    CREATE A NEW TAG    //
//                        //
////////////////////////////
// POST -> -> -> http://localhost:3001/api/tags <- <- <- POST //
// router.post('/', (req, res) => {
//   Tag.create({
//     tag_name: req.body.tag_name
//   })
// });
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
// 
// 
// 
///////////////////////////////////
//                               //
//    UPDATE TAG's NAME BY ID    //
//                               //
///////////////////////////////////
// PUT -> -> -> http://localhost:3001/api/tags/{ID} <- <- <- PUT //
router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: "No match" });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
// 
// 
// 
////////////////////////////
//                        //
//    DELETE TAG BY ID    //
//                        //
////////////////////////////
// POST -> -> -> http://localhost:3001/api/tags/{ID} <- <- <- POST //
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deleteTag) => {
    res.json(deleteTag)
  })
  .catch((err) => res.json(err));
});


module.exports = router;
