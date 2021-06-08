import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css';
import backgroudImage from './assets/mojave.jpeg';

import Header from './components/Header';

/**
 * Componetes
 * Propriedade
 * Estado e Imutabilidade
 */

function App(){
    // useState Retorna um array com 2 posicao
    // Este e um conceito de Imutabilidade quer dizer nao podemos mutar variaveis de maneira direta
    // Por isso usaremos SetProjects, deve evitar o uso de metodo ou funcao que altera o valor original
    // Na 1 Posicao ele retorna a varivel com o valor inicial
    // Na 2 posicao retorna uma funcao para atualizar o valor do array
    const [projects, setProjects] = useState([]);

    // useEffect e usado para dispara funcao quando uma variavel e alterada 
    // Ou quando um componete for exbibido na tela. recebe dois parametro 
    // O 1 Parametro e qual funcao vc quer disparar
    // O 2 Parametro e quando eu quero disparar esta funcao
    useEffect(() => {
        api.get('/projects').then(response =>{
            setProjects(response.data)
        })
    }, []);

    async function hadleAddproject(){
        // Conceito de imutabilidade aplicado ...projects copia todo o valor anterios e add um novo sem alterar diretamente a variavel
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);

        const response = await api.post('/projects',{
            title: `Novo Projeto ${Date.now()}`,
            owner: "Jhon"
        });
        const project = response.data;
        setProjects([...projects, project]);
    }

    return(
        <>
            <Header title="Homepage">
                <ul>
                    <li>Homepage</li>
                    <li>Projects</li>
                </ul>
            </Header>

            <Header title="Projects">
            <img width={300} src={backgroudImage} />
                <ul>
                    {projects.map(project => {
                        return <li key={project.id}> {project.title} </li>
                    })};
                </ul>
            </Header>

            <button type="button" onClick={hadleAddproject} >Adicionar Projeto</button>
        </>
    )
}

export default App;