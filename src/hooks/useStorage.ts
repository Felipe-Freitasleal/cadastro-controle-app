import { useSQLiteContext } from "expo-sqlite";

interface IInsertRegister {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: number;
  neighborhood: number;
}

interface IEditRegister {
  id: string;
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  gender: number | null;
  neighborhood: number | null;
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
  }: IInsertRegister) => {
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
      bairro: string;
      genero: string;
      id: string;
      idade: number;
      nome: string;
      sobrenome: string;
    }[]
  > => {
    try {
      const result: {
        bairro: string;
        genero: string;
        id: string;
        idade: number;
        nome: string;
        sobrenome: string;
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
      await database.getAllAsync(`DELETE FROM usuarios WHERE id = ?`, [id]);
    } catch (error) {
      console.log("Erro ao excluir: ", error);
      throw error;
    }
  };

  const editRegistered = async ({
    id,
    firstName,
    lastName,
    age,
    gender,
    neighborhood,
  }: IEditRegister) => {
    const statement = await database.prepareAsync(
      `UPDATE usuarios
      SET 
        nome = COALESCE(?, usuarios.nome),
        sobrenome = COALESCE(?, usuarios.sobrenome),
        idade = COALESCE(?, usuarios.idade),
        genero = COALESCE(?, usuarios.genero),
        bairro = COALESCE(?, usuarios.bairro)
      WHERE
        id = ?`
    );

    try {
      await statement.executeAsync([
        firstName,
        lastName,
        age,
        gender,
        neighborhood,
        id,
      ]);

      return "Usuário editado com sucesso!";
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
    getAllRegistered,
    deleteRegistered,
    editRegistered,
  };
};

export default useStorage;
