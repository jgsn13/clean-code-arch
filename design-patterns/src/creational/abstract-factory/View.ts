import { Label, Button, WidgetFactory } from '.';

export default class View {
  public label: Label;
  public button: Button;

  constructor(widgetFactory: WidgetFactory) {
    this.label = widgetFactory.createLabel();
    this.button = widgetFactory.createButton();
  }
}
