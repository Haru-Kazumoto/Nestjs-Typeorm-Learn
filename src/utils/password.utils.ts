import * as bcrypt from "bcrypt";

export async function encodePassword(password: string): Promise<string> {
    const SALT = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, SALT);
}

export async function decodePassword(rawPassword: string, password: string): Promise<boolean>{
    return bcrypt.compareSync(rawPassword, password);
}