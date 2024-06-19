import Test from "./test.model";

export interface TestOverview {
  test: Test;
  results: Avaliation[];
}

export interface Avaliation {
  incorrects: number,
  corrects: number,
  missPlaceds: number
}
