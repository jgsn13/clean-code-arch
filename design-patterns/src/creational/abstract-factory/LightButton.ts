import { Button } from '.';

export default class LightButton implements Button {
  public color: string;
  public backgroundColor: string;

  constructor() {
    this.color = 'white';
    this.backgroundColor = 'blue';
  }
}
