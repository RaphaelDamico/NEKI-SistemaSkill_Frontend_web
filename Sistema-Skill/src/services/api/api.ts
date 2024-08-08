import axios from "axios";
import { IUserCredentials } from "../../interfaces";

const api = axios.create({
    baseURL: "http://localhost:8080/"
});

const handleRegisterError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            alert(`Erro no servidor: ${error.response.data}`);
            console.log(error.response.data, "Aqui");
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            alert("Nenhuma resposta recebida do servidor.");
            console.log(error.request);
        } else {
            alert(`Erro ao configurar a requisição: ${error.message}`);
            console.log('Error', error.message);
        }
    } else {
        alert(`Erro desconhecido: ${error}`);
        console.log('Error', error);
    }
};

const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
            throw new Error("Usuário ou senha inválidos");
        }
        console.error("Erro de Login", error.message);
        throw new Error("Login falhou");
    } else {
        console.error("Erro desconhecido", error);
        throw new Error("Erro desconhecido");
    }
};

export const signupUser = async(payload: IUserCredentials) => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`auth/signup`, {
            "username": username,
            "password": password
        });
        if(response.status == 201)
            alert("Usuário registrado com sucesso");
        else {
            alert("Erro ao registrar usuário, tente novamente.")
            return;
        }
    } catch (error) {
        handleRegisterError(error);
    }
};

export const signinUser = async(payload: IUserCredentials): Promise<void> => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`auth/signin`, {
            "username": username,
            "password": password
        });
        const token = response.data.token;
        if(!token)
            throw new Error("Token não encontrado na resposta");
        await localStorage.setItem("userToken", JSON.stringify(token));
        alert("Login realizado com sucesso!");
    } catch (error: unknown) {
        handleAuthError(error);
    }
};