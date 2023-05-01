import { WidgetFactory, Label, Button, LightLabel, LightButton } from '.';

export default class LightWidgetFactory implements WidgetFactory {
  createLabel(): Label {
    return new LightLabel();
  }
  createButton(): Button {
    return new LightButton();
  }
}
