import React, { useEffect, useState, useRef } from "react";
import { Hnadlefetechannouncements } from "../Pages/Admin/APIS/Fetechannouncements";
import {
    AiOutlineWarning,
    AiOutlineInfoCircle,
    AiOutlineCheckCircle,
    AiOutlineCloseCircle,
    AiOutlineCalendar,
    AiOutlineDownload,
} from "react-icons/ai";
import { UserName } from "../Apis/Islogin";

const AUTO_CLOSE_MS = 7000;

const TYPE_STYLES = {
    important: {
        color: "#fff",
        labelBg: "#e53e3e",
        bg: "#fff5f5",
        border: "#fed7d7",
        iconBg: "#fee2e2",
        iconColor: "#dc2626",
        icon: <AiOutlineCloseCircle size={18} color="#dc2626" />,
    },
    info: {
        color: "#fff",
        labelBg: "#3182ce",
        bg: "#ebf8ff",
        border: "#bee3f8",
        iconBg: "#dbeafe",
        iconColor: "#2563eb",
        icon: <AiOutlineInfoCircle size={18} color="#2563eb" />,
    },
    success: {
        color: "#fff",
        labelBg: "#38a169",
        bg: "#f0fff4",
        border: "#c6f6d5",
        iconBg: "#dcfce7",
        iconColor: "#16a34a",
        icon: <AiOutlineCheckCircle size={18} color="#16a34a" />,
    },
    warning: {
        color: "#fff",
        labelBg: "#d97706",
        bg: "#fffbeb",
        border: "#fde68a",
        iconBg: "#fef3c7",
        iconColor: "#d97706",
        icon: <AiOutlineWarning size={18} color="#d97706" />,
    },
    default: {
        color: "#fff",
        labelBg: "#718096",
        bg: "#f7fafc",
        border: "#e2e8f0",
        iconBg: "#f3f4f6",
        iconColor: "#6b7280",
        icon: <AiOutlineInfoCircle size={18} color="#6b7280" />,
    },
};

const getStyle = (type = "") =>
    TYPE_STYLES[type.toLowerCase()] ?? TYPE_STYLES.default;

function formatDate(d) {
    return new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit", month: "2-digit", year: "numeric",
    });
}

function Announcement() {
    const [open, setOpen] = useState(true);
    const [data, setData] = useState([]);
    const [progress, setProgress] = useState(100);
    const timerRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        (async () => {
            const res = await Hnadlefetechannouncements();
            const filtterbyrole = res.filter((data) => data.TargetAudience == "Both" ? res : data.TargetAudience.toLowerCase() == UserName.role + "s")
            if (UserName.role == "Admin") { return setData([]) }
            setData(filtterbyrole);
        })();

        const step = 50;
        intervalRef.current = setInterval(() => {
            setProgress(p => Math.max(0, p - (step / AUTO_CLOSE_MS) * 100));
        }, step);
        timerRef.current = setTimeout(() => setOpen(false), AUTO_CLOSE_MS);

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timerRef.current);
        };
    }, []);

    const close = () => {
        clearInterval(intervalRef.current);
        clearTimeout(timerRef.current);
        setOpen(false);
    };

    if (!open) return null;

    return (
        <>

            {data.length == 0 ? "" : <div
                onClick={close}
                style={{
                    position: "fixed", inset: 0,
                    background: "rgba(0,0,0,0.40)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999, padding: 16,
                }}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    style={{
                        background: "#f7f8fa",
                        borderRadius: 12,
                        width: "100%",
                        maxWidth: 520,
                        maxHeight: "85vh",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    }}
                >
                    {/* Progress bar */}
                    <div style={{ height: 3, background: "#e2e8f0" }}>
                        <div style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: "#3b82f6",
                            transition: "width 0.05s linear",
                        }} />
                    </div>

                    {/* Header */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 18px",
                        background: "#fff",
                        borderBottom: "1px solid #e8edf2",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <AiOutlineInfoCircle size={18} color="#3b82f6" />
                            <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#1a202c" }}>
                                Announcements
                            </p>
                            <span style={{
                                background: "#ebf4ff", color: "#3b82f6",
                                fontSize: 11, fontWeight: 600,
                                borderRadius: 20, padding: "1px 8px",
                                border: "1px solid #bfdbfe",
                            }}>
                                {data.length}
                            </span>
                        </div>
                        <button
                            onClick={close}
                            style={{
                                border: "1px solid #e2e8f0", background: "#fff",
                                borderRadius: 8, width: 28, height: 28,
                                cursor: "pointer", fontSize: 16, color: "#9ca3af",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            ×
                        </button>
                    </div>

                    {/* Cards List */}
                    <div style={{ overflowY: "auto", flex: 1, padding: "14px 14px 4px" }}>
                        {data.length === 0 ? (
                            <p style={{ textAlign: "center", color: "#9ca3af", padding: "32px 0", fontSize: 14 }}>
                                No announcements right now.
                            </p>
                        ) : (
                            data.map((item, idx) => {
                                const s = getStyle(item.AnnouncementType);
                                return (
                                    <div
                                        key={item.id ?? idx}
                                        style={{
                                            background: "#fff",
                                            border: "1px solid #e8edf2",
                                            borderRadius: 10,
                                            marginBottom: 12,
                                            overflow: "visible",
                                            position: "relative",
                                            paddingTop: 14,
                                        }}
                                    >
                                        {/* ── Folded corner label (like image) ── */}
                                        <div style={{
                                            position: "absolute",
                                            top: -1,
                                            left: 16,
                                            background: s.labelBg,
                                            color: "#fff",
                                            fontSize: 11,
                                            fontWeight: 700,
                                            padding: "4px 12px 4px 10px",
                                            borderRadius: "0 0 6px 6px",
                                            letterSpacing: "0.03em",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                            // Folded notch effect
                                            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
                                            paddingBottom: 10,
                                            minWidth: 80,
                                            justifyContent: "center",
                                        }}>
                                            {s.icon &&
                                                React.cloneElement(s.icon, { color: "#fff", size: 13 })
                                            }
                                            {item.AnnouncementType
                                                ? item.AnnouncementType.charAt(0).toUpperCase() + item.AnnouncementType.slice(1)
                                                : "General"}
                                        </div>

                                        {/* Card body */}
                                        <div style={{ padding: "8px 14px 12px", marginTop: 18 }}>

                                            {/* Title row */}
                                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                                {/* Circular icon */}
                                                <div style={{
                                                    width: 36, height: 36,
                                                    borderRadius: "50%",
                                                    background: s.iconBg,
                                                    border: `1.5px solid ${s.border}`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    flexShrink: 0,
                                                }}>
                                                    {s.icon}
                                                </div>

                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{
                                                        margin: 0,
                                                        fontWeight: 600,
                                                        fontSize: 14,
                                                        color: "#1a202c",
                                                        lineHeight: 1.4,
                                                    }}>
                                                        {item.Title}
                                                    </p>
                                                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>
                                                        For: <b style={{ color: "#1F2937" }}>
                                                            {item.TargetAudience === "Both" ? <b>Students + Teachers</b> : ""}
                                                        </b>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Banner image */}
                                            {item.Banner_url && (
                                                <img
                                                 loading="lazy"
                                                    src={item.Banner_url}
                                                    alt={item.Title}
                                                    style={{
                                                        width: "100%", height: 90, objectFit: "cover",
                                                        borderRadius: 6, marginTop: 10,
                                                    }}
                                                />
                                            )}

                                            {/* Date row — styled like the reference image */}
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: 10,
                                                paddingTop: 10,
                                                borderTop: "1px dashed #e8edf2",
                                                flexWrap: "wrap",
                                                gap: 6,
                                            }}>
                                                {/* Start date */}
                                                <div style={{
                                                    display: "flex", alignItems: "center", gap: 5,
                                                    fontSize: 12, color: "#718096",
                                                }}>
                                                    <AiOutlineCalendar size={14} color="#3b82f6" />
                                                    <span style={{ color: "#4a5568", fontWeight: 500 }}>
                                                        {formatDate(item.StartDate)}
                                                    </span>
                                                </div>

                                                {/* End date with download icon */}
                                                <div style={{
                                                    display: "flex", alignItems: "center", gap: 5,
                                                    fontSize: 12, color: "#3b82f6", fontWeight: 500,
                                                }}>
                                                    <AiOutlineDownload size={14} color="#3b82f6" />
                                                    <span>Until {formatDate(item.EndDate)}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    {/* Footer */}
                    <div style={{
                        padding: "12px 14px",
                        background: "#fff",
                        borderTop: "1px solid #e8edf2",
                        display: "flex", justifyContent: "flex-end",
                    }}>
                        <button
                            onClick={close}
                            style={{
                                fontSize: 13, fontWeight: 500,
                                color: "#fff", background: "#3b82f6",
                                border: "none", borderRadius: 7,
                                padding: "7px 20px", cursor: "pointer",
                            }}
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>}
        </>

    );
}

export default Announcement;