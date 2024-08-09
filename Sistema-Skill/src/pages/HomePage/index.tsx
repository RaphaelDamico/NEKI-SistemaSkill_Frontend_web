import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "./styles.module.css";
import { deleteUserSkill, getUserSkills } from "../../api/api";
import { UserSkill } from "../../interfaces";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";

export default function HomePage() {
    const [userSkillList, setUserSkillList] = useState<UserSkill[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [skillToDelete, setSkillToDelete] = useState<number | null>(null);

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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenDeleteModal = (userSkillId: number) => {
        setSkillToDelete(userSkillId);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSkillToDelete(null);
    };

    const handleSaveSkills = async () => {
        await getuserSkillsList();
        handleCloseModal();
    };

    const handleDeleteUserSkill = async (userSkillId: number) => {
        try {
            await deleteUserSkill(userSkillId);
            await getuserSkillsList();
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleConfirmDelete = async () => {
        if (skillToDelete !== null) {
            await handleDeleteUserSkill(skillToDelete);
            handleCloseModal();
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
                <Card key={skill.userSkillId} userSkill={skill} deleteSkill={handleOpenDeleteModal} />
            ))}
            <Modal
                isVisibleModal={isModalOpen}
                onCancel={handleCloseModal}
                onSave={handleSaveSkills}
                userSkills={userSkillList}
            />
            <DeleteModal
                isVisibleModal={isDeleteModalOpen}
                onCancel={handleCloseDeleteModal}
                onDelete={handleConfirmDelete}
            />
        </div>
    );
}