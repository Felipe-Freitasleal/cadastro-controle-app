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

  return {
    getNeighborhoods,
    getGender,
    insertRegister,
  };
};

export default useStorage;
