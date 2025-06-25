
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
/>
import style from "./Footer.module.css";



function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className="footer-top">
          <h4>UnaHur Anti-Social Net</h4>
          
        </div>
        <div className="footer-links">
          <a href="/about">Sobre Nosotros</a>
          <a href="/contact">Contacto</a>
          <a href="/terms">Términos</a>
        </div>
        <div className="footer-social">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-github"></i></a>
        </div>
        <p className="footer-copy">© 2025 UnaHur | Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;


