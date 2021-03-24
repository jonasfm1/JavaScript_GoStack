import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

/**
 * Os Elementos Nao possuem valores sematios nem estilizacao propria
 * todos os componetes por padrao tem display: flex
 * 
 * View: == div, footer, header, main, aside, section
 * Text: == p, span, strong, h1, h2,h3
 */

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('/projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Jonas Maciel'
        });
        const project = response.data;

        setProjects([...projects, project]);
    }
    
    return (
        <>
            <StatusBar  barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container} >
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    //Abaixo nos estamos renderizando os itens e convertendo a Var item para project usando " : " e informando um novo nome
                    renderItem={({ item: project }) => {
                        return <Text style={styles.project} > {project.title} </Text>
                    }}
                />

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}> Adicionar Projeto </Text>
                </TouchableOpacity>
                
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#7159c1',
    },

    project:{
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold',
    },

    button:{
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});