import React from 'react'

function PoupProfileimg({ url, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

                <div className="relative max-w-lg w-full mx-4">

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <img
                            src={url}
                            alt="profile"
                            className="w-full max-h-[500px] object-contain"
                        />
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute hover:cursor-pointer -top-3 -right-3 bg-white text-gray-700 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-lg"
                    >
                        ✕
                    </button>

                </div>
            </div>

        </div>
    )
}

export default PoupProfileimg