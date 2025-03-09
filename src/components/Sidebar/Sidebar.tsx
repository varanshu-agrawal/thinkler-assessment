// CollapsibleSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from './sidebar.module.css';

const Sidebar = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location.pathname]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.sidebarHeader}>
                {!collapsed && <h2 className={styles.logo}>thinkle.</h2>}
                <button
                    onClick={toggleSidebar}
                    className={styles.toggleButton}
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>
            <nav className={`${styles.linkContainer}`}>
                <Link className={`${styles.linkItem} ${currentPage === "/" ? styles.activeLink : ""}`} to="/">
                    {collapsed ? 'D' : 'Dashboard'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/bookings" ? styles.activeLink : ""}`} to="/bookings">
                    {collapsed ? 'B' : 'Bookings'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/messages" ? styles.activeLink : ""}`} to="/messages">
                    {collapsed ? 'M' : 'Messages'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/assessment" ? styles.activeLink : ""}`} to="/assessments">
                    {collapsed ? 'A' : 'Assessment'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/thinkle-creator" ? styles.activeLink : ""}`} to="/thinkle-creator">
                    {collapsed ? 'T' : 'Thinkle+ Creator'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/reviews" ? styles.activeLink : ""}`} to="/reviews">
                    {collapsed ? 'R' : 'Reviews'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/calendar" ? styles.activeLink : ""}`} to="/calendar">
                    {collapsed ? 'C' : 'Calendar'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/payments" ? styles.activeLink : ""}`} to="/payments">
                    {collapsed ? 'P' : 'Payments'}
                </Link>
                <Link className={`${styles.linkItem} ${currentPage === "/profile" ? styles.activeLink : ""}`} to="/profile">
                    {collapsed ? 'P' : 'Profile'}
                </Link>
            </nav>
            <div className={`${styles.sidebarFooter}`}>
                {!collapsed ? (
                    <>
                        <p>Contact Support</p>
                        <p>Logout</p>
                    </>
                ) : (
                    <>
                        <p>C</p>
                        <p>L</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;