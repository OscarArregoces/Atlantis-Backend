export interface Auth {
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}
export interface ChangePassword {
    id: string;
    password: string;
    newPassword: string;
}