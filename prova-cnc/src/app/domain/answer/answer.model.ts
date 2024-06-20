import { Time } from "@angular/common";
import Test from "../test/test.model";
import Tentity from "../Tentity.model";
import TimeOnly from "@domain/_utils/timeonly.type";

export default class Answer extends Tentity {
    student?: string;
    userAnswer?: string;
    attempts?: number;
    time?: TimeOnly | string;
    startDate?: Date;
    idTest?: number;
    idTestNavigation?: Test;
    grade?: number;
}
