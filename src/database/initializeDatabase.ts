import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id TEXT PRIMARY KEY UNIQUE NOT NULL,
            nome TEXT NOT NULL,
            sobrenome TEXT NOT NULL,
            idade INTEGER NOT NULL,
            genero INTEGER,
            bairro INTEGER,
            FOREIGN KEY(genero) REFERENCES generos(id),
            FOREIGN KEY(bairro) REFERENCES bairros(id)
        )
      `);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS generos (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            genero TEXT NOT NULL
        )
      `);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS bairros (
            id INTEGER PRIMARY KEY UNIQUE NOT NULL,
            bairro TEXT NOT NULL
        )
      `);

    const getBairros = await database.getAllAsync("SELECT * FROM bairros");

    if (getBairros.length === 0) {
      await database.execAsync(`
            INSERT INTO bairros (id, bairro) VALUES 
                (1, 'Centro'), 
                (2, 'Barra'), 
                (3, 'Lapa'), 
                (4, 'Itapuã'), 
                (5, 'São João'), 
                (6, 'Anhãguera');
        `);
    }

    const getGeneros = await database.getAllAsync("SELECT * FROM generos");

    if (getGeneros.length === 0) {
      await database.execAsync(`
            INSERT INTO generos (id, genero) VALUES 
                (1, 'masculino cisgenero'), 
                (2, 'masculino transgenero'), 
                (3, 'feminino cisgenero'), 
                (4, 'feminino transgenero'), 
                (5, 'não binário'), 
                (6, 'outro');
        `);
    }
  } catch (error) {
    console.log("Erro ao inicializar banco de dados:  ", error);
    throw error;
  }
}
