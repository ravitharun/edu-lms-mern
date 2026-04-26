const mongoose =require("mongoose")

const UploadMatearilasSchema = mongoose.Schema(
  {


},
  {
    timestamps: true,
  }
);

export default mongoose.model('UploadMatearilas', UploadMatearilasSchema);
