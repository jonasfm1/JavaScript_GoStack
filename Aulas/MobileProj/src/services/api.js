import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.11:3333',
});

export default api;
/**
 * iOS com Emulador: localhost
 * iOS Fisico: IP Maquina
 * 
 * AndroidOS com Emulador : localhost (adb reverse tcp:3333 tcp:3333)
 * Android emulador e uma maquina virtual ele entende que local host e ele mesmo
 * sendo assim temos que direcionar o IP para o IP da Nossa aplicacao.
 * 
 * AndroidOS com Emulador: Caso o "reverse" nao funcione basta utilizar o 
 * Android localhost emulator 10.0.2.2 para Android Studio emulador
 * No caso do Genymotion 10.0.3.2
 * 
 * AndroidOS Fisico: IP da Maquina
 * 
 */