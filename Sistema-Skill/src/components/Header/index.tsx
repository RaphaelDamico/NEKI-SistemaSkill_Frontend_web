import Button from "../Button";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    setIsModalOpen: (value: boolean) => void;
}

export default function Header({ setIsModalOpen }: HeaderProps) {
    const navigate = useNavigate();

    const username = localStorage.getItem("savedUsername");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const signout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <header className={styles.headerContainer}>
            <section className={styles.wellcomeAndLogoutContent}>
                <Button
                    content={<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                        <line x1="12" y1="2" x2="12" y2="12" />
                    </svg>}
                    backgroundColor="#19536E"
                    width={70}
                    onClick={signout}
                />
                <h1>Bem vindo(a) {username}</h1>
            </section>
            <section className={styles.listSkillsAndAddButtonContent}>
                <h1>Lista de Skills</h1>
                <Button
                    content={"+ Adicionar skill"}
                    backgroundColor="#19536E"
                    width={200}
                    onClick={handleOpenModal}
                />
            </section>
        </header>
    );
};
