import React from "react";
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <p>Commit 80c607d</p>
            <p>O Hung Lun</p>
            <p>Copyright © {currentYear}</p>
        </footer>
    );
}

export default Footer;