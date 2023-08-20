const asyncHandler = require('express-async-handler');

//@desc  crud operations
exports.addNew = (Model) => asyncHandler(async (req, res) => {
    let data = Model.findById(req.params.id);
    if(data) res.status(400).json({message: "Already exists"});
    else{
      data = new Model(req.body);
      await data.save();
      res.status(200).json({
        message: "Added Successfully",
        data
      });}
  });

exports.updateById = (Model) => asyncHandler(async(req, res) => {
    const data = await Model.findOne({ _id: req.params.id });
      if (!data) {
        return res.status(404).json({
          message: " not found !",
        });
      }
      
    let updatedNew = await Model.findByIdAndUpdate(req.params.id, req.body);
    if(updatedNew) return res.status(200).json({message : "Updated Successfully", updatedNew});
    else res.status(500).json({message : "can't update data"});
});
  
exports.deleteOne = (Model) => asyncHandler(async(req, res) => {
    let data = await Model.findByIdAndRemove({ _id: req.params.id });
    if (data) {
        console.log("Successfully deleted.");
  
        return res.status(200).json({
          message: "deleted successfully.",
    });
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
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
    let data = await Model.findById({ _id: req.params.id });
      if (!data) {
        return res.status(404).json({
          message: "Not found!",
        });
      }
      return res.json(data);

});

exports.get_ByKey = (Model) => asyncHandler(async(req, res) =>{
    let data = await Model.find({ $regex : req.params.key });
    if( data.length > 0) {res.send(data)}
    else
      return res.status(404).json({"message": "not found!"});             
  });