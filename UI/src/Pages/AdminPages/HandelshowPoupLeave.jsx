import React from 'react'

function HandelshowPoupLeave({PoupData,click,sethandelshowPoup}) {
    console.log(PoupData,"PoupData Components")
    console.log(sethandelshowPoup,"PoupData Components")
    return (

       <div className="fixed top-20 right-10 z-50">

    {/* Popup Box */}
    <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] relative border">

        {/* Close Button */}
        <button
            onClick={click}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
            ✕
        </button>

        {/* Popup Content */}
        <div>
            hey
        </div>

    </div>

</div>
    )
}

export default HandelshowPoupLeave