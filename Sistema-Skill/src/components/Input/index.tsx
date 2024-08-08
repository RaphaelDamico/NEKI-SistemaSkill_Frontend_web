import { InputProps } from "../../interfaces";
import styles from "./styles.module.css";

const Input: React.FC<InputProps> = ({ label, type, value, onChange, placeholder, name, id }) => {
    return (
        <div className={styles.inputContainer}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
                name={name}
                id={id}
            />
        </div>
    );
};

export default Input;
