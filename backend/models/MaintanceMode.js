const mongoose = require("mongoose")
const ModeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "main_config",
    },

    modeAddedBy: {
      type: String,
      required: true,
    },

    isMaintenanceMode: {
      type: Boolean,
      default: false,
    },

    modeText: {
      type: String,
      default: "Default Mode",
    },

    maintenanceUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// model
const MaintanceModel=mongoose.model("Maintance",ModeSchema)
module.exports=MaintanceModel