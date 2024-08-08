export interface InputProps {
    label: string;
    type: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    name?: string;
    id?: string;
    hasIcon?: boolean;
};

export interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
};

export interface ButtonProps {
    text: string | React.ReactNode;
    onClick?: () => void;
    backgroundColor: string;
    type?: "submit";
};

export interface IUserCredentials {
    username: string;
    password: string;
};
