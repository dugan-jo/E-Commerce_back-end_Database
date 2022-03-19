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
// POST -> -> -> http://localhost:3001/api/categories <- <- <- POST //
router.get('/', (req, res) => {
  Tag.findAll().then((tagData) => {
    res.json(tagData);
  })
});
// 
// 
// 
///////////////////////////////////
//                               //
//    FIND A SINGLE TAG BY ID    //
//                               //
///////////////////////////////////
// POST -> -> -> http://localhost:3001/api/categories <- <- <- POST //
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Product.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!productData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    } 
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});
// 
// 
// 
////////////////////////////
//                        //
//    CREATE A NEW TAG    //
//                        //
////////////////////////////
// POST -> -> -> http://localhost:3001/api/categories <- <- <- POST //
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
});
// 
// 
// 
///////////////////////////////////
//                               //
//    UPDATE TAG's NAME BY ID    //
//                               //
///////////////////////////////////
// PUT -> -> -> http://localhost:3001/api/categories <- <- <- PUT //
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
// POST -> -> -> http://localhost:3001/api/categories <- <- <- POST //
router.delete('/:id', (req, res) => {
  Category.destroy({
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
