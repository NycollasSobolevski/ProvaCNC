import AlertType from "./AlertType.enum";

export default interface AlertOptions {
  message : string;
  kind : AlertType;
  duration? : number;
}
