import { useEffect } from "react";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./styles.module.css"
import { deleteUserSkill, getUserSkills } from "../../api/api";
import { UserSkill } from "../../interfaces";

interface CardProps {
    userSkill: UserSkill;
    deleteSkill: (userId: number) => void;
}

export default function Card({userSkill, deleteSkill}: CardProps) {

    return (
        <div className={styles.cardContainer}>
            <div className={styles.buttonContainer}>
                <Button
                    text={
                        <Icon name={"edit"}
                            color="#356F7A"
                        />
                    }
                />
                <Button
                    text={
                        <Icon name={"trash"}
                            color="red"
                        />
                    }
                    onClick={() => deleteSkill(userSkill.userSkillId)}
                />
            </div>
            <div className={styles.cardContent}>
                <img src={userSkill.skill.image} alt="" width={150} height={150} />
                <div className={styles.infoContent}>
                    <span>Level: {userSkill.level}</span>
                    <span>Nome: {userSkill.skill.skillName}</span>
                    <span>Descrição: {userSkill.skill.description}</span>
                </div>
            </div>
        </div>
    );
}