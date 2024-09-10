import { IAddress, IName } from ".";

export type IUserInput = {
    email: string,
    phone: string,
    password: string,
    address: IAddress,
    name: IName,
};