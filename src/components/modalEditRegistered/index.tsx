import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useStorage from "../../hooks/useStorage";
import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { DropdownList } from "../dropdownList";

interface IModalEditResitered {
  registered: any;
  handleCloseModalEdit: () => void;
  fetchData: () => void;
}

export function ModalEditRegistered({
  registered,
  handleCloseModalEdit,
  fetchData,
}: IModalEditResitered) {
  const [neighborhoodsList, setNeighborhoodsList] = useState<
    {
      bairro: string;
      id: number;
    }[]
  >([]);
  const [genderList, setGenderList] = useState<
    {
      genero: string;
      id: number;
    }[]
  >([]);
  const [formState, setFormState] = useState({
    selectedGender: 0,
    selectedNeighborhood: 0,
    firstName: "",
    lastName: "",
    age: "",
  });
  const { getNeighborhoods, getGender, editRegistered } = useStorage();
  const focused = useIsFocused();
  const dropdownRefGender = useRef<any>(null);
  const dropdownRefNeighborhood = useRef<any>(null);

  useEffect(() => {
    async function fetchData() {
      const neighborhoods = await getNeighborhoods();

      setNeighborhoodsList(neighborhoods);

      const genders = await getGender();

      setGenderList(genders);
    }

    fetchData();
  }, [focused]);

  function resertStates() {
    setFormState({
      selectedGender: 0,
      selectedNeighborhood: 0,
      firstName: "",
      lastName: "",
      age: "",
    });

    if (dropdownRefGender.current) {
      dropdownRefGender.current.reset();
    }

    if (dropdownRefNeighborhood.current) {
      dropdownRefNeighborhood.current.reset();
    }
  }

  const handleChange = (key: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  async function handleEdit() {
    if (
      formState.firstName === "" &&
      formState.lastName === "" &&
      formState.selectedGender === 0 &&
      formState.age === "" &&
      formState.selectedNeighborhood === 0
    ) {
      alert("Nada para editar");
      return;
    }

    const newRegistered = {
      id: registered.id,
      firstName: formState.firstName !== "" ? formState.firstName : null,
      lastName: formState.lastName !== "" ? formState.lastName : null,
      age: formState.age !== "" ? Number(formState.age) : null,
      gender: formState.selectedGender !== 0 ? formState.selectedGender : null,
      neighborhood:
        formState.selectedNeighborhood !== 0
          ? formState.selectedNeighborhood
          : null,
    };

    const toEdit = await editRegistered(newRegistered);
    fetchData();
    alert(toEdit);
    toCloseModal();
  }

  function toCloseModal() {
    resertStates();
    handleCloseModalEdit();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Editar</Text>

        <View style={styles.innerPassword}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            value={formState.firstName}
            onChangeText={(input) => handleChange("firstName", input)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Sobrenome"
            value={formState.lastName}
            onChangeText={(input) => handleChange("lastName", input)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Idade"
            value={String(formState.age)}
            keyboardType="numeric"
            onChangeText={(input) => {
              const newInput = input.replace(/[^0-9]/g, "");
              handleChange("age", newInput);
            }}
            maxLength={3}
          />
          <DropdownList
            listItem={genderList}
            setItem={(id) => handleChange("selectedGender", id)}
            placeHold={"Selecione seu Gênero"}
            renderProp={"genero"}
            defaultValue={formState.selectedGender}
            dropdownRef={dropdownRefGender}
          />
          <DropdownList
            listItem={neighborhoodsList}
            setItem={(id) => handleChange("selectedNeighborhood", id)}
            placeHold={"Selecione seu Bairro"}
            renderProp={"bairro"}
            defaultValue={formState.selectedNeighborhood}
            dropdownRef={dropdownRefNeighborhood}
          />
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBack]}
            onPress={toCloseModal}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonEdit]}
            onPress={() => {
              handleEdit();
            }}
          >
            <Text style={[styles.buttonText, styles.buttonTextColor]}>
              Editar
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
  innerPassword: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    gap: 16,
  },
  text: {
    color: "#FFF",
  },
  buttonArea: {
    flexDirection: "column",
    width: "90%",
    height: 80,
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
  textInput: {
    height: 54,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999",
    paddingHorizontal: 16,
  },
});
