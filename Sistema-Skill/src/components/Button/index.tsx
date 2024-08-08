import { ButtonProps } from "../../interfaces";
import styles from "./styles.module.css";

export default function Button({text, onClick, backgroundColor}: ButtonProps) {
    return(
        <div className={styles.buttonContainer}>
            <button onClick={onClick} className={styles.button} style={{backgroundColor: backgroundColor}}>
                {text}
            </button>
        </div>
    );
};