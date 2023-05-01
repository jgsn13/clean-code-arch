import { Label } from '.';

export default class LightLabel implements Label {
  public color: string;

  constructor() {
    this.color = 'black';
  }
}
