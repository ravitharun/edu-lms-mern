const leaveStatus = async (req, res) => {
    try {
        const{st}=req.query
        console.log(st,'st')
        // const getStatus=""
        console.log('hey')
        return res.json({message:"hey"})
    } catch (error) {
        console.log(error.message, 'error From the email Approveal.')

    }

}

module.exports = { leaveStatus }