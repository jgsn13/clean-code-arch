DROP TABLE IF EXISTS ccca.order_item CASCADE;
DROP TABLE IF EXISTS ccca.order CASCADE;
DROP TABLE IF EXISTS ccca.coupon CASCADE;
DROP TABLE IF EXISTS ccca.item CASCADE;

DROP SCHEMA IF EXISTS ccca CASCADE;

CREATE SCHEMA ccca;

CREATE TABLE ccca.item (
  id_item SERIAL PRIMARY KEY,
  category TEXT,
  description TEXT,
  price NUMERIC,
  width INTEGER,
  height INTEGER,
  length INTEGER,
  weight INTEGER
);

INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Música', 'CD', 30, 30, 30, 10, 0.5);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Vídeo', 'DVD', 50, 40, 20, 10, 0.5);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Vídeo', 'VHS', 10, 40, 20, 10, 0.5);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20);
INSERT INTO ccca.item (category, description, price, width, height, length, weight) VALUES ('Acessórios', 'Cabo', 30, 10, 10, 10, 0.9);

CREATE TABLE ccca.coupon (
  code TEXT PRIMARY KEY,
  percentage NUMERIC,
  expire_date TIMESTAMP
);

INSERT INTO ccca.coupon (code, percentage, expire_date) VALUES ('VALE20', 20, '2024-10-10T10:00:00');
INSERT INTO ccca.coupon (code, percentage, expire_date) VALUES ('VALE20_EXPIRED', 20, '2022-10-10T10:00:00');

CREATE TABLE ccca.order (
  id_order SERIAL PRIMARY KEY,
  coupon TEXT,
  code TEXT,
  cpf TEXT,
  issue_date TIMESTAMP,
  freight NUMERIC,
  sequence INTEGER
);

CREATE TABLE ccca.order_item (
  id_order INTEGER,
  id_item INTEGER,
  price NUMERIC,
  quantity INTEGER,
  PRIMARY KEY (id_order, id_item)
);
