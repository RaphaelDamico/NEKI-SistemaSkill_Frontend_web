import { GrFormViewHide, GrFormView } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface IconProps {
    name: string;
    className?: string;
    color?: string;
    onClick?: () => void;
}

const icons = {
    viewHide: GrFormViewHide,
    viewOpen: GrFormView,
    trash: FaRegTrashAlt,
    edit: FiEdit
};

export default function Icon({ name, className, color, onClick }: IconProps) {
    if (!icons[name as keyof typeof icons]) return null;

    const IconComponent = icons[name as keyof typeof icons];

    return (
        <>
            <IconComponent
                className={className}
                color={color}
                onClick={onClick}
            />
        </>
    );
};