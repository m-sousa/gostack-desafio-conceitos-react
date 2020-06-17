import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setProjects(response.data));
  }, []);

  async function handleAddRepository() {
    const repositoryName = `novo-repositorio-${Date.now()}`;

    const response = await api.post("repositories", {
      title: repositoryName,
      url: `https://github.com/m-sousa/${repositoryName}`,
      techs: ["JavaScript"],
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((response) => {
      if (response.status === 204) {
        const projectIndex = projects.findIndex((project) => project.id === id);
        projects.splice(projectIndex, 1);
        setProjects([...projects]);
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
