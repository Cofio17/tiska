import { ReactNode } from "react";

export type ButtonPropsType = {
    type: 'submit' | 'reset' | 'button';
    className?: string;
    onClick: () => void;
    ariaHidden: boolean;
    children: React.ReactNode;
};

export type ModalProps = {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export type MaterialCardProps = {
    title: string,
    description: string,
    imageUrl?: string,
}