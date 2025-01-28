import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStorage from "../../hooks/useStorage";

interface ModalHandleRegisteredProps {
  registered: any;
  handleCloseModal: () => void;
  setRegisteredList: React.Dispatch<
    React.SetStateAction<
      {
        bairro: string;
        genero: string;
        id: string;
        idade: number;
        nome: string;
        sobrenome: string;
      }[]
    >
  >;
}

export function ModalHandleRegistered({
  registered,
  handleCloseModal,
  setRegisteredList,
}: ModalHandleRegisteredProps) {
  const { deleteRegistered, getAllRegistered } = useStorage();

  async function handleDelete(id: string) {
    alert("Usuario excluído com sucesso!");

    await deleteRegistered(id);
    const registered = await getAllRegistered();
    setRegisteredList(registered);
    handleCloseModal();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro Selecionado</Text>

        <Pressable style={styles.innerPassword}>
          <Text style={styles.text}>
            Nome: {`${registered.nome} ${registered.sobrenome} `}
          </Text>
          <Text style={styles.text}> Idade: {`${registered.idade}`}</Text>
          <Text style={styles.text}> Gênero: {`${registered.genero}`}</Text>
          <Text style={styles.text}> Bairro: {`${registered.bairro}`}</Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
            <Text>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => {
              handleDelete(registered.id);
            }}
          >
            <Text style={styles.buttonSaveText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: "#FFF",
    // textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
    borderRadius: 8,
  },
  buttonSave: {
    backgroundColor: "red",
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
