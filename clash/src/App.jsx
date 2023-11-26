import React, { useState, useEffect, useRef } from 'react';
import './App.css';
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

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>&copy; 2023 EloannB. Tous droits réservés.</p>
    </footer>
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

  return (
    <div>
      <Navbar /> { }
      <div className="container">
        <div className="row">
          {data.map((item, index) => (
            <div className="col-md-4 mb-3 d-flex align-items-stretch">
              <div className="card mx-auto" style={{ width: '18rem' }}>
                <img
                  src={`${item.iconUrls.medium}`}
                  className="card-img-top"
                  alt="présentation personnage"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <a href="#" className="btn">
                    Voir plus
                  </a>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      <Footer /> { }
    </div>
  );
};

export default App;

