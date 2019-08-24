export interface Roles {
    reader?: boolean;
    editor?: boolean;
    admin?: boolean;
}

export interface UserInterface {
    uid?: string;
    fullName?: string;
    email?: string;
    photoUrl?: string;
    emailVerified: boolean;
    roles: Roles;
}
