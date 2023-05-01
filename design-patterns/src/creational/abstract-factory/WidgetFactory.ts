import { Label, Button } from '.';

export default interface WidgetFactory {
  createLabel(): Label;
  createButton(): Button;
}
