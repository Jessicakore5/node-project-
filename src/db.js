// import { query } from 'express'
import pg from 'pg'

const { Client } = pg

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Styxa',
  password: 'Halhatatlansag6',
  port: 5432
})

await client.connect()

export function createUser() {
  client.query(
    `
    CREATE TABLE  IF NOT EXISTS felhasznalok (
            id INT GENERATED ALWAYS AS IDENTITY,
            nev VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            datum TIMESTAMP,
            PRIMARY KEY (id)
        )`
  )
}
export function createCategory() {
  client.query(
    `CREATE TABLE IF NOT EXISTS kategoriak(
      id INT GENERATED ALWAYS AS IDENTITY,
      kategoriaNev VARCHAR(200),
        PRIMARY KEY (id))`
  )
}
export function createArticles() {
  client.query(
    `CREATE TABLE IF NOT EXISTS cikkek(
      cikkId INT GENERATED ALWAYS AS IDENTITY,
      cikkCim VARCHAR(250),
      cikkDatum TIMESTAMP,
      szerzoId  INT ,
      szoveg VARCHAR(1000),
      kategoriaid INT ,
      
      PRIMARY KEY (cikkId),
      
      CONSTRAINT fk_kategoriaid
      FOREIGN KEY (kategoriaid)
      REFERENCES kategoriak (id)
      
      )`
  )
}

export function createComments() {
  client.query(` CREATE TABLE IF NOT EXISTS hozzaszolasok(
hozzaszolasId INT GENERATED ALWAYS AS IDENTITY,
felhId INT,
cikkId INT,
datum TIMESTAMP,
szoveg VARCHAR(1000),

PRIMARY KEY (hozzaszolasId),

 CONSTRAINT fk_felhId
     FOREIGN KEY (felhId)
     REFERENCES felhasznalok (felhId)
)
    `)
}

export function createFavorites() {
  client.query(`CREATE TABLE kedvencek(
felhId INT,
cikkId INT
)
    `)
}

export async function addUser(nev, email) {
  await client.query(`
    INSERT INTO felhasznalok(id,nev,email,datum)
    VALUES (default,'${nev}','${email}',NOW())`)
}

export function addCategory(kategoriaNev) {
  client.query(`INSERT INTO kategoriak
      VALUES(DEFAULT,'${kategoriaNev}')
      `)
}

export async function addArticles(cikkCim, szerzoId, szoveg) {
  await client.query(`
      INSERT INTO cikkek(cikkId,cikkCim,cikkDatum,szerzoId,szoveg)
      VALUES(DEFAULT,'${cikkCim}',NOW(),${szerzoId},'${szoveg}')`)
}

export async function addComments(felhId, cikkId, szoveg) {
  await client.query(`
    INSERT INTO hozzaszolasok(hozzaszolasId,felhId,cikkId,datum,szoveg)
VALUES (DEFAULT,$${felhId},${cikkId},NOW(),'${szoveg}')
      `)
}

export async function getUsers() {
  const users = await client.query(`SELECT * FROM felhasznalok`)
  return users.rows
}

export async function getCategory() {
  const categories = await client.query(`SELECT * FROM kategoriak`)
  return categories.rows
}
export async function getArticles() {
  const articles = await client.query(`SELECT  *  FROM cikkek`)
  return articles.rows
}

export async function getComments() {
  const comments = await client.query(`SELECT * FROM hozzaszolasok`)
  return comments.rows
}

export async function updateUser(nev, email, id) {
  const user = await client.query(` 
            UPDATE felhasznalok
            SET nev= '${nev}',email= '${email}'
            WHERE id=${id}
            `)
  return user.rows
  // export async function updateUser(id, nev, email) {
  //   const user = await client.query(`
  //             UPDATE felhasznalok
  //             SET nev= '${nev}',email= '${email}'
  //             WHERE id=${id}
  //             `)
  //   return user.rows
  // }
}

export async function updateCategory(kategoriaNev, id) {
  const categories = await client.query(`
    UPDATE kategoriak
    SET kategoriaNev='${kategoriaNev}'
    WHERE id= ${id}`)
  return categories.rows
}

export async function updateArticles(
  cikkId,
  cikkCim,
  cikkDatum,
  szerzoId,
  szoveg
) {
  return await client.query(`
      UPDATE cikkek
      SET cikkCim= '${cikkCim}',cikkDatum=${cikkDatum},szerzoiId=${szerzoId},szoveg='${szoveg}'
      WHERE cikkId=${cikkId}`)
}

export async function updateComments(hozzaszolasId, felhId, cikkId, szoveg) {
  return await client.query(`
    UPDATE hozzaszolasok
    SET felhId=${felhId},cikkId=${cikkId},szoveg='${szoveg}'
    WHERE hozzaszolasId=${hozzaszolasId}`)
}

export async function deleteUser(id) {
  const users = await client.query(`
    DELETE FROM felhasznalok
    WHERE id =${id}`)
  return users.rows
}

export async function deleteCategory(id) {
  const categories = await client.query(`
      DELETE FROM kategoriak
      WHERE id=${id}`)
  return categories.rows
}

export async function deleteArticles(cikkId) {
  const categories = await client.query(`
        DELETE FROM cikkek
        WHERE cikkId=${cikkId}`)
  return categories.rows
}

export async function deleteComments(hozzaszolasId) {
  const comments = await client.query(`
    DELETE FROM hozzaszolasok
    WHERE hozzaszolasId=${hozzaszolasId}`)
  return comments.rows
}
