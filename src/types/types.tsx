export interface InterfaceUser {
    about: string;
    avatar: string;
    cohort: string;
    name: string;
    _id: string;
}

export interface InterfaceLike {
    _id: string;
}

export interface InterfaceCard {
    createAt: string;
    likes: InterfaceLike[];
    link: string;
    name: string;
    _id: string;
    owner: InterfaceUser;
}