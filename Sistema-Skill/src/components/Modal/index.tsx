import { useEffect, useState } from "react";
import Button from "../Button";
import CardModal from "../CardModal";
import styles from "./styles.module.css"
import { addSkillToUser, getAllSkills } from "../../api/api";
import { Skill, UserSkill, UserSkillRequest } from "../../interfaces";

interface ModalProps {
    isVisibleModal: boolean;
    onCancel: () => void;
}

export default function Modal({ isVisibleModal, onCancel }: ModalProps) {
    const [skillsList, setSkillsList] = useState<Skill[] | null>();

    useEffect(() => {
        const getSkillsList = async () => {
            try {
                const data = await getAllSkills();
                setSkillsList(data);
            } catch (error) {
                console.error();
            }
        };
        getSkillsList();
    }, []);

    const handleChange = (skill: Skill) => {
        const teste = skillsList?.map((item) => {
            if (item.skillId === skill.skillId) {
                return {
                    ...item,
                    checked: !item.checked
                }
            }
            return item;
        });
        setSkillsList(teste || []);
    };

    const handleSave = async () => {
        try {
            await addSkillToUser(skillsList?.filter((item) => {
                return item.checked === true;
            }).map((item) => ({
                skillId: item.skillId,
                userId: 1
            }) as UserSkillRequest)|| [] );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isVisibleModal &&
                <>
                    <div className={styles.modalOverlay} />
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h1>Selecionar Skill</h1>
                        </div>
                        <div className={styles.modalContent}>
                            {skillsList?.map((skill) => (
                                <CardModal key={skill.skillId} skill={skill} onChange={() => handleChange(skill)} />
                            ))}
                        </div>
                        <div className={styles.buttonContainer}>
                            <Button
                                text={"Cancelar"}
                                backgroundColor="#D9534F"
                                width={100}
                                onClick={() => onCancel()}
                            />
                            <Button
                                text={"Salvar"}
                                backgroundColor="#356F7A"
                                width={100}
                                onClick={() => handleSave()}
                            />
                        </div>
                    </div>
                </>
            }
        </>
    );
}