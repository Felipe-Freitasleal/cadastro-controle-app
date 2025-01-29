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
  setOpenCloseEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisteredToEdit: React.Dispatch<React.SetStateAction<{}>>;
}

export function ModalHandleRegistered({
  registered,
  handleCloseModal,
  setRegisteredList,
  setOpenCloseEditModal,
  setRegisteredToEdit,
}: ModalHandleRegisteredProps) {
  const { deleteRegistered, getAllRegistered } = useStorage();

  async function handleDelete(id: string) {
    await deleteRegistered(id);
    const registered = await getAllRegistered();
    setRegisteredList(registered);
    handleCloseModal();
    alert("Usuario excluído com sucesso!");
  }

  async function handleEdit(registered: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: number;
    neighborhood: number;
  }) {
    setRegisteredToEdit(registered);
    setOpenCloseEditModal(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastro Selecionado</Text>

        <Pressable style={styles.registeredInfo}>
          <Text style={styles.text}>
            Nome: {`${registered.nome} ${registered.sobrenome} `}
          </Text>
          <Text style={styles.text}> Idade: {`${registered.idade}`}</Text>
          <Text style={styles.text}> Gênero: {`${registered.genero}`}</Text>
          <Text style={styles.text}> Bairro: {`${registered.bairro}`}</Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBack]}
            onPress={handleCloseModal}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            onPress={() => {
              handleEdit(registered);
            }}
          >
            <Text style={[styles.buttonText, styles.buttonTextColor]}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={() => {
              handleDelete(registered.id);
            }}
          >
            <Text style={[styles.buttonText, styles.buttonTextColor]}>
              Excluir
            </Text>
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
  registeredInfo: {
    backgroundColor: "#0e0e0e",
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: "#FFF",
  },
  buttonArea: {
    flexDirection: "column",
    width: "90%",
    height: 180,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    maxHeight: 40,
    minHeight: 40,
  },
  buttonBack: {
    backgroundColor: "grey",
  },
  buttonSave: {
    backgroundColor: "red",
  },
  buttonEdit: {
    backgroundColor: "green",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  buttonTextColor: {
    color: "#fff",
  },
});
