// CollapsibleSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import styles from './sidebar.module.css';
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(location.pathname);
    const [collapsed, setCollapsed] = useState(false);
    const { isMobile } = useContext(AppContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [location.pathname]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    console.log(styles);


    return (
        <>
            {isMobile ? (
                <>
                    <button className={styles.hamburgerButton} onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <div className={styles.faTimes}>{React.createElement(FaTimes as any)}</div> : React.createElement(FaBars as any)}
                    </button>
                    <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                        <nav className={styles.linkContainer}>
                            <Link className={`${styles.linkItem} ${currentPage === "/" ? styles.activeLink : ""}`} to="/" onClick={closeMobileMenu}>
                                Dashboard
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/bookings" ? styles.activeLink : ""}`} to="/bookings" onClick={closeMobileMenu}>
                                Bookings
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/messages" ? styles.activeLink : ""}`} to="/messages" onClick={closeMobileMenu}>
                                Messages
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/assessment" ? styles.activeLink : ""}`} to="/assessments" onClick={closeMobileMenu}>
                                Assessment
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/thinkle-creator" ? styles.activeLink : ""}`} to="/thinkle-creator" onClick={closeMobileMenu}>
                                Thinkle+ Creator
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/reviews" ? styles.activeLink : ""}`} to="/reviews" onClick={closeMobileMenu}>
                                Reviews
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/calendar" ? styles.activeLink : ""}`} to="/calendar" onClick={closeMobileMenu}>
                                Calendar
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/payments" ? styles.activeLink : ""}`} to="/payments" onClick={closeMobileMenu}>
                                Payments
                            </Link>
                            <Link className={`${styles.linkItem} ${currentPage === "/profile" ? styles.activeLink : ""}`} to="/profile" onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </nav>
                    </div>
                </>
            ) : (
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
                </div>
            )}
        </>
    );
};

export default Sidebar;
