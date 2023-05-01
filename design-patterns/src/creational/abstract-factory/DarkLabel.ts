import { Label } from '.';

export default class DarkLabel implements Label {
  public color: string;

  constructor() {
    this.color = 'white';
  }
}
