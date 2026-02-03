export const HandelUpload = async (data) => {
    try {
   
          for (let [key, vlu] of data.entries()) {
                    console.log(key, vlu,"api");
                }
    }
    catch (err) {
        console.log(err)
    }
}