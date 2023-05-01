import { WidgetFactory, Label, Button, DarkLabel, DarkButton } from '.';

export default class DarkWidgetFactory implements WidgetFactory {
  createLabel(): Label {
    return new DarkLabel();
  }
  createButton(): Button {
    return new DarkButton();
  }
}
