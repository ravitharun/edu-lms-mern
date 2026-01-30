import React from "react";
import App from "../../App";
import AdminHeader from "../../Components/AdminHeader";
import AddingSoon from "../../Loaders/AddingSoon";

function AdminProfile() {
  return (
    <>
      <App />
      <div className="md:ml-64 p-6 min-h-screen bg-gray-100">
        {/* Header */}
        <AdminHeader pathname={"Profile"} />

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mt-6 mb-6">
          Admin Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-8">

          {/* Profile Image */}
          <div className="flex items-center gap-6" onTouchMove={()=>alert("hi")}>
            <img
              src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211468.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Picture
              </h2>
              <p className="text-sm text-gray-500">
                Upload a professional photo
              </p>
            </div>
         <div className="flex justify-end">
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
    Edit
  </button>
</div>

          </div>

          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" />
              <Input label="Employee ID" />
              <Input label="Department" />
              <Input label="Designation" />
              <Input label="Role" />
            </div>
          </section>

          {/* About Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              About
            </h3>

            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              rows="4"
              placeholder="Write about yourself..."
            />
          </section>

          {/* Contact Details */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Official Email ID" type="email" />
              <Input label="Phone Number" />
              <Input label="Alternate Contact Number" />
              <Input label="City" />
              <Input label="State" />
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Educational Qualifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Highest Qualification" />
              <Input label="Specialization / Major" />
              <Input label="University / College Name" />
              <Input label="Year of Passing" />
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Professional Experience
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Total Teaching Experience (Years)" />
              <Input label="Industry Experience (Years)" />
              <Input label="Previous Institution(s)" />
              <Input label="Areas of Expertise" />
            </div>
          </section>

          {/* Online Presence */}
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Online Presence
            </h3>

            <Input label="LinkedIn Profile URL" type="url" />
          </section>

          {/* Loader / Coming Soon */}
          <AddingSoon pathname={"Profile"} />
        </div>
      </div>
    </>
  );
}

/* Reusable Input Component */
const Input = ({ label, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      placeholder={label}
    />
  </div>
);

export default AdminProfile;
