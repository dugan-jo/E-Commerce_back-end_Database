const router = require('express').Router();
const { Category, Product } = require('../../models');
// 
// 
// 
//////////////////////////////
//                          //
//    GET ALL CATEGORIES    //
//                          //
//////////////////////////////
// GET -> -> -> http://localhost:3001/api/categories <- <- <- GET //
router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// 
// 
// 
//////////////////////////////
//                          //
//    GET CATEGORY BY ID    //
//                          //
//////////////////////////////
// GET -> -> -> http://localhost:3001/api/categories/{ID} <- <- <- GET //
router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: "NO category found with that id!"});
      return;
    }
    res.status(200).json(driverData);
  }catch (err) {
    res.status(500).json(err);
  }
});
// 
// 
// 
/////////////////////////////////
//                             //
//    CREATE A NEW CATEGORY    //
//                             //
/////////////////////////////////
// POST -> -> -> http://localhost:3001/api/categories <- <- <- POST //
router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.params. {
      include: [{ model: Product }]
    })
    
  }
});
// 
// 
// 
////////////////////////////////////
//                                //
//    UPDATE A CATEGORY BY ID     //
//                                //
////////////////////////////////////
// PUT -> -> -> http://localhost:3001/api/categories <- <- <- PUT //
router.update('/:id', (req, res) => {
  Category.update(
    {
    category_name: req.body.category_name
  })
});
// 
// 
// 
 /////////////////////////////////////
 //                                 //
 //    DELETE A CATEGORY BY ID      //
 //                                 //
 /////////////////////////////////////
// DESTROY -> -> -> http://localhost:3001/api/categories/{ID} <- <- <- DESTROY //
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
});

module.exports = router;
