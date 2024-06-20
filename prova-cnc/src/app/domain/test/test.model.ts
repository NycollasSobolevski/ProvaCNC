import Tentity from "../Tentity.model"
import Answer from "../answer/answer.model"

export default class Test extends Tentity
{
    code?: string
    description?: string
    title?: string
    attempts?: number
    question?: string
    answer?: string
    answers?: Answer[] = []
    errors?: number
}
