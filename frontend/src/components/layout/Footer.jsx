const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2026 Chess Manager. All rights reserved.</p>
        </footer>
    );
};

const styles = {
    footer: {
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#1f2937",
        color: "white",
        marginTop: "auto",
    },
};

export default Footer;
