const UploadMaterial = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
    } catch (error) {
        console.log("error", error)
    }
}
module.exports = UploadMaterial