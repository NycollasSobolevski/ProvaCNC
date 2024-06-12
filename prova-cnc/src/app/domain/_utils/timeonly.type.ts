
class TimeOnly {
  hour: number = 0;
  minute: number = 0;
  second: number = 0

  toString () : string {
    const hour = this.hour > 9 ? `${this.hour}` : `0${this.hour}`
    const min = this.minute > 9 ? `${this.minute}` : `0${this.minute}`
    const sec = this.second > 9 ? `${this.second}` : `0${this.second}`
    return `${hour}:${min}:${sec}`;
  }
}

export default TimeOnly
