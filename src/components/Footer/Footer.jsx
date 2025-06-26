
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
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;


