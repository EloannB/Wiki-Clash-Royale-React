import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-white">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="img/Royale.png"
            alt="Logo"
            style={{ width: '200px', marginRight: '10px' }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Accueil
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Abou
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Rechercher"
                aria-label="Rechercher"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-danger" type="submit">
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('../data/persoClash.json')
      .then((response) => response.json())
      .then((data) => setData(data.items))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    var x;
    var $cards = document.querySelectorAll(".card");
    var $style = document.querySelector(".hover");

    $cards.forEach((card) => {
      card.addEventListener("mousemove", handleMove);
      card.addEventListener("touchmove", handleMove);
      card.addEventListener("mouseout", handleOut);
      card.addEventListener("touchend", handleOut);
      card.addEventListener("touchcancel", handleOut);
    });

    function handleMove(e) {
      // normalise touch/mouse
      var pos = [e.offsetX, e.offsetY];
      e.preventDefault();
      if (e.type === "touchmove") {
        pos = [e.touches[0].clientX, e.touches[0].clientY];
      }

      var $card = $(e.currentTarget);
      // math for mouse position
      var l = pos[0];
      var t = pos[1];
  
      var w = $card.width();
      var px = Math.abs(Math.floor((100 / w) * l) - 100);
      var py = Math.abs(Math.floor((100 / h) * t) - 100);
      var pa = (50 - px) + (50 - py);
      // math for gradient / background positions
      var lp = 50 + (px - 50) / 1.5;
      var tp = 50 + (py - 50) / 1.5;
      var px_spark = 50 + (px - 50) / 7;
      var py_spark = 50 + (py - 50) / 7;
      var p_opc = 20 + Math.abs(pa) * 1.5;
      var ty = ((tp - 50) / 2) * -1;
      var tx = ((lp - 50) / 1.5) * 0.5;
      // css to apply for the active card
      var grad_pos = `background-position: ${lp}% ${tp}%;`;
      var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
      var opc = `opacity: ${p_opc / 100};`;
      var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

      // set / apply css class and style
      $cards.removeClass("active");
      $card.removeClass("animated");
      $card.attr("style", `${tf}; ${grad_pos}`);
      $style.html(`${grad_pos} ${sprk_pos} ${opc}`);
      if (e.type === "touchmove") {
        return false;
      }
      clearTimeout(x);
    }


    function handleOut() {
      // remove css, apply custom animation on end
      var $card = $(this);
      $style.html("");
      $card.removeAttr("style");
      x = setTimeout(function () {
        $card.addClass("animated");
      }, 2500);
    }

    return () => {
      // Cleanup - remove event listeners when the component unmounts
      $cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("touchmove", handleMove);
        card.removeEventListener("mouseout", handleOut);
        card.removeEventListener("touchend", handleOut);
        card.removeEventListener("touchcancel", handleOut);
      });
    };
  }, [data]);

  return (
    <div>
      <Navbar />
      <main id="app">
        
        <section className="cards">
          <div className="card charizard animated"></div>
          <div className="card pika animated"></div>
          <div className="card eevee animated"></div>
          <div className="card mewtwo animated"></div>
        </section>
      </main>
    </div>
  );

};

export default App;