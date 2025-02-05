import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  View,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../../hooks/useStorage";
import { ModalHandleRegistered } from "../../components/modalRegistered";
import { useIsFocused } from "@react-navigation/native";
import { ModalEditRegistered } from "../../components/modalEditRegistered";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { closeEditModal } from "../../redux/slices/openCloseEditModalSlice";

export default function Registered() {
  const [registeredList, setRegisteredList] = useState<
    {
      bairro: string;
      genero: string;
      id: string;
      idade: number;
      nome: string;
      sobrenome: string;
    }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [registered, setRegistered] = useState({});
  const [registeredToEdit, setRegisteredToEdit] = useState({});

  const isOpen = useSelector((state: RootState) => state.openClose.value);
  const dispatch = useDispatch();

  const { getAllRegistered } = useStorage();

  const focused = useIsFocused();

  async function fetchData() {
    const registered = await getAllRegistered();

    setRegisteredList(registered);
  }

  useEffect(() => {
    fetchData();
  }, [focused]);

  function handleModelRegiteredItem(item: {
    bairro: string;
    genero: string;
    id: string;
    idade: number;
    nome: string;
    sobrenome: string;
  }) {
    setRegistered(item);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleCloseModalEdit() {
    dispatch(closeEditModal());
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastrados</Text>
      {registeredList.length === 0 ? (
        <View>
          <Text>Não há cadastrados</Text>
        </View>
      ) : (
        <FlatList
          style={{ width: "100%", paddingHorizontal: 14, paddingBottom: 14 }}
          data={registeredList}
          keyExtractor={(item) => {
            return String(item.id);
          }}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => handleModelRegiteredItem(item)}
                style={styles.buttonFlatList}
              >
                <View style={styles.textView}>
                  <Text style={styles.textFlatlist}>
                    Nome: {`${item.nome} ${item.sobrenome} `}
                  </Text>
                  <Text style={styles.textFlatlist}>
                    Idade: {`${item.idade}`}
                  </Text>
                  <Text style={styles.textFlatlist}>
                    Gênero: {`${item.genero}`}
                  </Text>
                  <Text style={styles.textFlatlist}>
                    Bairro: {`${item.bairro}`}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <ModalHandleRegistered
          registered={registered}
          handleCloseModal={handleCloseModal}
          setRegisteredList={setRegisteredList}
          // setOpenCloseEditModal={setOpenCloseEditModal}
          setRegisteredToEdit={setRegisteredToEdit}
        />
      </Modal>

      <Modal visible={isOpen} animationType="slide" transparent={true}>
        <ModalEditRegistered
          registered={registeredToEdit}
          handleCloseModalEdit={handleCloseModalEdit}
          fetchData={fetchData}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    width: "100%",
    textAlign: "center",
    padding: 14,
    fontWeight: "bold",
    fontSize: 24,
  },
  textFlatlist: {
    color: "#fff",
    marginVertical: 2,
  },
  buttonFlatList: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textView: {
    flexDirection: "column",
  },
});
