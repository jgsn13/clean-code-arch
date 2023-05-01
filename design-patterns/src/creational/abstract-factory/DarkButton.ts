import { Button } from '.';

export default class DarkButton implements Button {
  public color: string;
  public backgroundColor: string;

  constructor() {
    this.color = 'white';
    this.backgroundColor = 'black';
  }
}
