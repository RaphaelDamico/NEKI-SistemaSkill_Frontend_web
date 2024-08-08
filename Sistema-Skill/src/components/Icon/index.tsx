import { GrFormViewHide, GrFormView } from "react-icons/gr";
import styles from "./styles.module.css";

interface IconProps {
    name: string;
    className?: string;
    onClick?: () => void;
}

const icons = {
    viewHide: GrFormViewHide,
    viewOpen: GrFormView
};

export default function Icon({ name, className, onClick }: IconProps) {
    if (!icons[name as keyof typeof icons]) return null;

    const IconComponent = icons[name as keyof typeof icons];

    return (
        <>
            <IconComponent
                className={className}
                onClick={onClick}
            />
        </>
    );
};