import * as SQLite from 'expo-sqlite';
import { Place, PlaceResponse } from '../types/places';

const database = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            image TEXT,
            address TEXT,
            latitude REAL,
            longitude REAL
        )`,
        [],
        () => {
          resolve('Initiallized');
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};
export const insertPlace = (place: Place) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, image, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.image,
          place.location?.address || null,
          place.location?.latitude || null,
          place.location?.longitude || null,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const fetchData = () => {
  return new Promise<PlaceResponse[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, response) => {
          resolve(response.rows._array);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
};

export const fetchPlace = (placeId: number) => {
  return new Promise<PlaceResponse>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [placeId],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
