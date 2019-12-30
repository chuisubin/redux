import * as SQLite from "expo-sqlite";

export const OPEN_DB = SQLite.openDatabase("db.db");
export const CREATE_TABLE =
  "create table if not exists items (id integer primary key not null, done int, value text);";
export const SELECT_ALL_WHERE_DONE = `select * from items where done = ?;`;
export const SET_DONE_1 = `update items set done = 1 where id = ?;`;
export const DELETE_ITEM = `delete from items where id = ?;`;
export const INSERT_ITEM = "insert into items (done, value) values (0, ?)";
export const SELECT_ALL = "select * from items";
