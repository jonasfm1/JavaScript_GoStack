import React, { useEffect, useState} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  //PEGANDO REPOSITORIOS
  const [repositoriesList, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  },[]);

  
  //ADICIONANDO REPOSITORIOS
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Repository_Jonas",
      url: 'http://github.com/jonasfm1',
      techs: ["ReactJs"]
    })
    const newRepositorie = response.data;
    setRepositories([...repositoriesList, newRepositorie]);
  }


  //REMOVENDO REPOSITORIO
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    setRepositories(repositoriesList.filter(repositorie => repositorie.id !== id));
  }


  //LISTANDO REPOSITORIOS
  //id, title, url, likes, techs
  return (
    <div>
      <ul data-testid="repository-list">
        {repositoriesList.map(repositorie => {
          return <li key={repositorie.id}>

            <ul>
              <li>
                <a href={repositorie.url} target="_blank">
                  {repositorie.title}
                </a>
              </li>
              
              <li>
                Likes:{repositorie.likes}
              </li>
            </ul>

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
