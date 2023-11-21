import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('persoClash.json')
      .then((response) => response.json())
      .then((data) => setData(data.items))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div className="card" style={{width: '18rem'}} key={index}>
          <img src={`https://api-assets.clashroyale.com${item.iconUrls}`} className="card-img-top" alt="présentation personnage" />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.release_date}</p>
            <a href="#" className="btn btn-primary">Voir plus</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

