import React from "react";
import "./index.css";


const Footer = () => {
  return (
    <div className="div-0">
      <section className="footer">
        <div className="div-1">
          <ul>
            <span>Coordonnées :</span>
            <br />
            <li>
              <i className="fas fa-industry"></i>
              {"  "}
              Let's Go Camping
            </li>
            <li>
            <i className="bi bi-geo-alt"></i>
              {"  "}
              Tunisia
            </li>
            <li>
              <i className="fas fa-phone-square-alt"></i>
              {"  "}
              Téléphone : 28227454
            </li>
            
            <li>
              <i className="fas fa-mail-bulk"></i>
              {"  "}
              Email :benzeinebsamar@gmail.com
            </li>
          </ul>
        </div>
        <div className="div-2">
          <img src="/Images/logo.png" alt="logo" />
        </div>
        <div className="div-3">
          <ul>
            <span>Services :</span>
            <br />
            <li>
              <i className="fas fa-check-square"></i>
              {"  "}
              We help you to choose the best destination 
            </li>
            <li>
              <i className="fas fa-check-square"></i>
              {"  "}
              You'll find out another side of Tunisia. 
            </li>
            <li>
              <i className="fas fa-check-square"></i>
              {"  "}
              We help you not forget your equipment.
            </li> 
          </ul>
        </div>
        
      </section>
      <div className="copyrights">
        <p>
          &copy; {new Date().getFullYear()} Copyrights:{" "}
          <a href="/"> Let's Go Camping </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
