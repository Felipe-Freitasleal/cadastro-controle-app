import { useSQLiteContext } from "expo-sqlite";

interface InsertRegister {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: number;
  neighborhood: number;
}

const useStorage = () => {
  const database = useSQLiteContext();

  const getNeighborhoods = async (): Promise<
    {
      bairro: string;
      id: number;
    }[]
  > => {
    try {
      const result: {
        bairro: string;
        id: number;
      }[] = await database.getAllAsync("SELECT * FROM bairros");

      return result;
    } catch (error) {
      console.log("Erro ao buscar: ", error);
      return [];
    }
  };

  const getGender = async (): Promise<
    {
      genero: string;
      id: number;
    }[]
  > => {
    try {
      const result: {
        genero: string;
        id: number;
      }[] = await database.getAllAsync("SELECT * FROM generos");

      return result;
    } catch (error) {
      console.log("Erro ao buscar: ", error);
      return [];
    }
  };

  const insertRegister = async ({
    id,
    firstName,
    lastName,
    age,
    gender,
    neighborhood,
  }: InsertRegister) => {
    const statement = await database.prepareAsync(
      `INSERT INTO usuarios
          (id, nome, sobrenome, idade, genero, bairro)
          VALUES
          (?, ?, ?, ?, ?, ?)`
    );

    try {
      await statement.executeAsync([
        id,
        firstName,
        lastName,
        age,
        gender,
        neighborhood,
      ]);
      return "Usuário cadastrado no sistema";
    } catch (error) {
      console.log("Erro no insertRegister: ", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  };

  const getAllRegistered = async (): Promise<
    {
      bairro: string,
      genero: string,
      id: string,
      idade: number,
      nome: string,
      sobrenome: string
    }[]
  > => {
    try {
      const result: {
        bairro: string,
        genero: string,
        id: string,
        idade: number,
        nome: string,
        sobrenome: string
      }[] = await database.getAllAsync(`
        SELECT 
          bairros.bairro,
          generos.genero,
          usuarios.id,
          usuarios.idade,
          usuarios.nome,
          usuarios.sobrenome
        FROM
          usuarios
        LEFT JOIN bairros ON usuarios.bairro = bairros.id
        LEFT JOIN generos ON usuarios.genero = generos.id
        `);

      return result;
    } catch (error) {
      console.log("Erro ao buscar: ", error);
      return [];
    }
  };

  const deleteRegistered = async (id: string) => {
    try {
      await database.getAllAsync(`DELETE FROM usuarios WHERE id = ?`, [id])
    } catch (error) {
      console.log("Erro ao excluir: ", error);
      throw error
    }
  }

  return {
    getNeighborhoods,
    getGender,
    insertRegister,
    getAllRegistered,
    deleteRegistered
  };
};

export default useStorage;
