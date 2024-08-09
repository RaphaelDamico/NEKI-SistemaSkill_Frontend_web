import axios from "axios";
import { IUserCredentials, Skill, UserSkill, UserSkillRequest, UserSkillResponse } from "../interfaces";

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

export const signupUser = async (payload: IUserCredentials) => {
    const {
        username,
        password
    } = payload
    try {
        const response = await api.post(`auth/signup`, {
            "username": username,
            "password": password
        });
        if (response.status == 201)
            alert("Usuário registrado com sucesso");
        else {
            alert("Erro ao registrar usuário, tente novamente.")
            return;
        }
    } catch (error) {
        handleRegisterError(error);
    }
};

export const signinUser = async (payload: IUserCredentials): Promise<void> => {
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
        const userId = response.data.userId;
        if (!token)
            throw new Error("Token não encontrado na resposta");
        if (!userId)
            throw new Error("User ID não encontrado na resposta");
        await localStorage.setItem("userToken", JSON.stringify(token));
        await localStorage.setItem("userId", JSON.stringify(userId));
        alert("Login realizado com sucesso!");
    } catch (error: unknown) {
        handleAuthError(error);
    }
};

export const addSkillToUser = async (payload: UserSkillRequest[]): Promise<Skill[] | null> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.post<Skill[]>("skills/add-existing", payload, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar skill ao usuário: ", error);
        return null;
    }
};

export const getAllSkills = async (): Promise<Skill[] | null> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.get<Skill[]>("skills", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar skills:", error);
        return null;
    }
}

export const getUserSkills = async (userId: number): Promise<UserSkillResponse | null> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }
        const response = await api.get<UserSkillResponse>(`users/${userId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar skills do usuário:", error);
        return null;
    }
};

export const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.userId || null;
};

export const deleteUserSkill = async (skillId: number): Promise<void> => {
    try {
        const token = localStorage.getItem("userToken");
        if (!token) {
            throw new Error("Token não encontrado");
        }

        await api.delete(`skills/${skillId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
    } catch (error) {
        console.error(`Erro ao deletar skill com o id ${skillId}:`, error);
    }
};
