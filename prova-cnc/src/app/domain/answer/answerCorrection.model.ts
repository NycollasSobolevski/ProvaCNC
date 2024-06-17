import Answer from "./answer.model";

export enum AnswerCorrectionEnum {
  Correct,
  Incorrect,
  MissPlaced
}

export type CorrectionLocation = {
  x : number,
  y : number,
  value : AnswerCorrectionEnum
}

export class AnswerCorrection {
  answer! : Answer
  locations? : CorrectionLocation[]
  finished?: boolean
}
