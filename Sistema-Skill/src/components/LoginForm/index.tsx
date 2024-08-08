import { ChangeEvent, useState } from "react";
import Input from "../Input";
import styles from "./styles.module.css"
import Checkbox from "../Checkbox";
import Button from "../Button";

export default function LoginForm() {
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    function handleLoginChange() {
        //TODO criar método de login
    };
    function handlePasswordChange() {
        //TODO criar método de password
    };

    return (
        <section className={styles.formContainer}>
            <form className={styles.formContent}>
                <Input
                    label="Login"
                    type="text"
                    value={login}
                    onChange={handleLoginChange}
                    placeholder="Digite seu nome de usuario"
                    id="login"
                />
                <Input
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={handleLoginChange}
                    placeholder="Digite sua senha"
                    id="password"
                />
                <Checkbox
                    label={"Salvar senha"}
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <Button
                    text={"Entrar"}
                    onClick={() => {}}
                    backgroundColor={"#1A374B"}
                />
                <Button
                    text={"Cadastrar"}
                    onClick={() => {}}
                    backgroundColor={"#4EB888"}
                />
            </form>
        </section>
    );
}