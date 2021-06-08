//INTERFACE: USADA PARA DEFINIR O TIPO DE UM CONJUTO DE INFORMACOES GERALMENTE OBJETO
interface TechObject{
    title: string;
    experiece: number;
}

interface CreateUser {
    name?: string;
    email: string;
    password: string;
    techs: Array<string | TechObject>;
    //techs: string[]; CASO array de string ficaria esta declaracao
}

export default function CreateUser({ name = '', email, password}: CreateUser) {
    const user = {
        name,
        email,
        password,
    }
    return user;
}