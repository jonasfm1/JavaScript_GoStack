import { Request, Response } from 'express';
import createUser from './services/CreateUser';

// TIPAGENS: number, boolean, object, array
//INTERFACES: USADA PARA DEFINIR O TIPO DE UM CONJUTO DE INFORMACOES GERALMENTE OBJETO

export function helloWorld(request: Request, response: Response){
    const user = createUser({
        name: 'Jonas',
        email: 'jonas@teste.com',
        password: 'teste123',
        techs: ['node.JS', 'ReactJS', 'React Native',
        {title: 'Javascript', experiece: 100},
    ],
    });

    return response.json({ menssage: 'Hello World' })
}