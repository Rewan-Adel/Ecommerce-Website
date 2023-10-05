const asyncHandler = require('express-async-handler');

//@desc  crud operations
exports.addNew = (Model) => asyncHandler(async (req, res) => {
  let data = new Model(req.body);
  await data.save();
  return res.status(200).json({
        message: "Added Successfully",
        data
      });
  });

exports.updateById = (Model) => asyncHandler(async(req, res) => {
    const data = await Model.findById(req.params.id);
    if(req.body.email)
      if (!data) {
        return res.status(404).json({
          message: "Not found !",
        });
      }
      
    let updatedNew = await Model.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(updatedNew) return res.status(200).json({message : "Updated Successfully", updatedNew});
    else res.status(500).json({message : "can't update data"});
});
  
exports.deleteOne = (Model) => asyncHandler(async(req, res) => {
    let data = await Model.findByIdAndRemove({ _id: req.params.id });
    if (data) {
        return res.status(200).json({
          message: "Successfully deleted.",
    });
    } else {
        return res.status(404).json({
          message: "Not Found !.",
        });
      }
});
  
exports.getAll = (Model) => asyncHandler(async (req, res) => {
      let data = await Model.find();
      return res.status(200).json({
        count : data.length ,
        data});
});

exports.getById =  (Model) => asyncHandler(async (req, res) => {
    let data = await Model.findById( req.params.id );
      if (!data) {
        return res.status(404).json({
          message: "Not found!",
        });
      }
      return res.json(data);

});
