import { ButtonProps } from "../../interfaces";
import styles from "./styles.module.css";

export default function Button({text, onClick, backgroundColor, type}: ButtonProps) {
    return(
        <div className={styles.buttonContainer}>
            <button type={type} onClick={onClick} className={styles.button} style={{backgroundColor: backgroundColor}}>
                {text}
            </button>
        </div>
    );
};