import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "./styles.module.css";
import { deleteUserSkill, getUserSkills } from "../../api/api";
import { UserSkill } from "../../interfaces";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

export default function HomePage() {
    const [userSkillList, setUserSkillList] = useState<UserSkill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        getuserSkillsList();
    }, []);

    const getuserSkillsList = async () => {
        try {
            const data = await getUserSkills(1);
            if (data) {
                setUserSkillList(data.userSkills);
            } else {
                console.error("Falha ao buscar skills do usuário: os dados estão nulos.");
            }

        } catch (error) {
            console.error(error);
        }
    };

    function handleOpenModal() {
        setIsModalOpen(!isModalOpen);
    }

    const handleDeleteUserSkill = async (userSkillId: number) => {
        try {
            await deleteUserSkill(userSkillId);
            await getuserSkillsList();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.headerContainer}>
                <h1>Lista de Skills</h1>
            <Button
                text={"+ Adicionar skill"}
                backgroundColor="#19536E"
                width={200}
                onClick={handleOpenModal}
            />
            </header>
            {userSkillList.map((skill) => (
                <Card key={skill.userSkillId} userSkill={skill} deleteSkill={handleDeleteUserSkill} />
            ))}
            <Modal
                isVisibleModal={isModalOpen}
                onCancel={() => setIsModalOpen(false)
                }
            />
        </div>
    );
}