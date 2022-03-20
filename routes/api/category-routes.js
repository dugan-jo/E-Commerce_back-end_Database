const router = require("express").Router();
const { Category, Product } = require("../../models");
// 
// 
// 
//////////////////////////////
//                          //
//    GET ALL CATEGORIES    //
//                          //
//////////////////////////////
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// 
// 
// 
////////////////////////////
//                        //
//    GET ONE CATEGORY    //
//                        //
////////////////////////////
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "match not found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
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
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
// 
// 
// 
/////////////////////////////////////////////
//                                         //
//    UPDATE A CATEGORY BY ITS ID VALUE    //
//                                         //
/////////////////////////////////////////////
// 
router.put("/:id", async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: "No match" });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
// 
// 
// 
/////////////////////////////////////////////
//                                         //
//    DELETE A CATEGORY BY ITS ID VALUE    //
//                                         //
/////////////////////////////////////////////
// 
router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No match" });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;