import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiLock,
  FiShield,
  FiBell,
  FiTrash2
} from "react-icons/fi";
import MasterAdminNavbar from "./Master/MasterAdminNavbar";
import MasterLogoNav from "./Master/MasterLogoNav";
import { UserName } from "../../Apis/Islogin";

function AdminProfile() {
  const page = "Profile";
//   console.log(UserName)

  return (
    <div className="min-h-screen flex bg-gray-50">
      <MasterAdminNavbar path={page} />

      <div className="flex-1 flex flex-col min-w-0">
        <MasterLogoNav path={page} />

        <main className="flex-1 mt-[72px] px-4 md:px-6 lg:px-8 pb-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">

            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Profile
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your administrator account settings
              </p>
            </div>

            {/* Profile Card */}
            <Section title="Profile Information">
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div className="flex items-center gap-5">
                  <img className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600" src={UserName.profilePreview}>
                   
                  </img>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Super Admin
                    </h2>
                    <p className="text-sm text-gray-600">
                      admin@college.edu
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </div>
                </div>

                <button className="px-4 py-2 h-fit rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
                  Change Photo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Input label="Full Name" icon={<FiUser />} placeholder="Super Admin" value={UserName.name} />
                <Input label="Email" icon={<FiMail />} placeholder="admin@college.edu" value={UserName.email}/>
                <Input label="Phone" icon={<FiPhone />} placeholder="+91 98765 43210" />
                <Input label="Role" icon={<FiBriefcase />} placeholder="Administrator" disabled  value={"Admin"}/>
              </div>
            </Section>

            {/* Security */}
            <Section title="Security Settings" icon={<FiLock />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm Password" type="password" placeholder="••••••••" />
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Last password change: 12 Jan 2024
              </p>
            </Section>

            {/* Role & Permissions */}
            <Section title="Role & Permissions" icon={<FiShield />}>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✔ Manage Users</li>
                <li>✔ Manage Courses</li>
                <li>✔ View Reports</li>
                <li>✔ System Configuration</li>
              </ul>
            </Section>

            {/* Notifications */}
            <Section title="Notification Preferences" icon={<FiBell />}>
              <div className="space-y-3 text-sm">
                <Toggle label="Email Notifications" />
                <Toggle label="System Alerts" />
                <Toggle label="New User Registration Alerts" />
              </div>
            </Section>

            {/* Activity */}
            <Section title="Activity Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Info label="Last Login" value="Today, 10:45 AM" />
                <Info label="Device" value="Chrome on Windows" />
                <Info label="Account Created" value="12 Jan 2024" />
                <Info label="Last Updated" value="02 Feb 2026" />
              </div>
            </Section>

            {/* Danger Zone */}
            <div className="bg-white border border-red-200 rounded-xl p-6">
              <h3 className="text-red-600 font-semibold flex items-center gap-2">
                <FiTrash2 /> Danger Zone
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Deactivating your account will disable access immediately.
              </p>
              <button className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700">
                Deactivate Account
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

/* ===== Reusable Components ===== */

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl border shadow-sm p-6">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const Input = ({ label, icon, placeholder, type = "text", disabled = false,value }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        className={`w-full rounded-lg border px-${icon ? "10" : "4"} py-2.5 text-sm outline-none
          ${disabled
            ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
      />
    </div>
  </div>
);

const Toggle = ({ label }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span>{label}</span>
    <input type="checkbox" className="w-5 h-5 accent-blue-600" />
  </label>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default AdminProfile;
