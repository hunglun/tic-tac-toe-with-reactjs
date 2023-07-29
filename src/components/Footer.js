import React from "react";
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>Version 0.12</p>
            <p>O Hung Lun</p>
            <p>Copyright © {currentYear}</p>
        </footer>
    );
}

export default Footer;