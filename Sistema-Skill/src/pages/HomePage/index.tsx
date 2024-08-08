import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "./styles.module.css";
import { deleteUserSkill, getUserSkills } from "../../services/api/api";
import { UserSkill } from "../../interfaces";

export default function HomePage() {
    const [userSkillList, setUserSkillList] = useState<UserSkill[]>([]);

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

    const handleDeleteUserSkill = async (userSkillId: number) => {
        try {
            await deleteUserSkill(userSkillId);
            await getuserSkillsList();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className={styles.container}>
            {userSkillList.map((skill) => (
                <Card userSkill={skill} deleteSkill={handleDeleteUserSkill} />
            ))}
        </div>
    );
}