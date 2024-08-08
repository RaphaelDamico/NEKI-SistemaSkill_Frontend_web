import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import styles from "./styles.module.css"

export default function RegisterForm() {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();

    function handleRegisterChange() {
        //TODO criar método de login
    };

    function handlePasswordChange() {
        //TODO criar método de password
    };

    function handlePasswordConfirm() {
        //TODO criar método de password
    };

    return (
        <section className={styles.formContainer}>
            <form className={styles.formContent}>
                <Input
                    label="Usuario"
                    type="text"
                    value={username}
                    onChange={handleRegisterChange}
                    placeholder="Digite seu nome de usuario"
                    id="username"
                />
                <Input
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Digite sua senha"
                    id="password"
                />
                <Input
                    label="Confirmar senha"
                    type="password"
                    value={confirmPassword}
                    onChange={handlePasswordConfirm}
                    placeholder="Confirme sua senha"
                    id="password"
                />
                <Button
                    text={"Cadastrar"}
                    onClick={() => {}}
                    backgroundColor={"#1A374B"}
                />
                <Button
                    text={"Cancelar"}
                    onClick={() => {}}
                    backgroundColor={"#4EB888"}
                />
            </form>
        </section>
    );
}