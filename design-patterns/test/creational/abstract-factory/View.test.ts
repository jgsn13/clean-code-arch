// Fornecer uma interface para criação de FAMÍLIAS DE OBJETOS RELACIONADOS, sem especificar as suas classes concretas.

import {
  View,
  LightWidgetFactory,
  DarkWidgetFactory,
} from '../../../src/creational/abstract-factory';

test('Deve criar uma interface gráfica com tema claro', function () {
  const view = new View(new LightWidgetFactory());
  expect(view.label.color).toBe('black');
  expect(view.button.color).toBe('white');
  expect(view.button.backgroundColor).toBe('blue');
});

test('Deve criar uma interface gráfica com tema escuro', function () {
  const view = new View(new DarkWidgetFactory());
  expect(view.label.color).toBe('white');
  expect(view.button.color).toBe('white');
  expect(view.button.backgroundColor).toBe('black');
});
