
import React from "react";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import "../Pages/AccountDeactivated.css";
import { Link } from "react-router-dom";

function AccountDeactivated() {
    return (
        <div className="deactivate-wrapper">
            <div className="deactivate-card">

                {/* Icon */}
                <div className="icon-wrapper">
                    <ShieldExclamationIcon className="icon" />
                </div>

                {/* Title */}
                <h1 className="title">Account Deactivated</h1>

                {/* Description */}
                <p className="description">
                    Your account has been deactivated and you currently do not have access
                    to the Learning Management System.
                </p>

                <div className="info-box">
                    <p>
                        Please contact your institution administrator for further assistance
                        or to request account reactivation.
                    </p>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <Link to="/login">          <button className="btn secondary">Back to Login</button></Link>
                    <button className="btn primary">Contact Administrator</button>
                </div>

            </div>
        </div>
    );
}

export default AccountDeactivated;