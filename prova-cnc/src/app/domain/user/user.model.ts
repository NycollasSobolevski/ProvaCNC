import Tentity from "../Tentity.model";

export default class User extends Tentity {
    name?: string;
    identification?: string;
    password?: string;
    salt?: string;
    admin?: boolean;
}