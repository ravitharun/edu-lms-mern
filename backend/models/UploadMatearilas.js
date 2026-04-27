const mongoose = require("mongoose")

const UploadMatearilasSchema = mongoose.Schema(
  {
    Class: { type: String, required: true },
    subjectname: { type: String, required: true },
    CourseID: { type: String, required: true },
    Description: { type: String, default: "Study Materials" },
    teacher_id: { type: String, required: true },
    views: { type: Number, default: 0 },
    UploadUrl:{type:String,required:true}
  },
  {
    timestamps: true,
  }
);
 const MaterialsSchema= mongoose.model('UploadMatearilas', UploadMatearilasSchema);

module.exports=MaterialsSchema