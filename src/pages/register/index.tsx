import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../../hooks/useStorage";
import { RegisterDropdown } from "../../components/registerDropdown";
import { uuidGenerator } from "../../utils/uuidGenerator";
import { useIsFocused } from "@react-navigation/native";

export default function Register() {
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
    age: 0,
  });
  const { getNeighborhoods, getGender, insertRegister } = useStorage();
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
    // resertStates();
  }, [focused]);

  function resertStates() {
    setFormState({
      selectedGender: 0,
      selectedNeighborhood: 0,
      firstName: "",
      lastName: "",
      age: 0,
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

  async function handleRegister() {
    const uuid = uuidGenerator();

    const result = await insertRegister({
      id: uuid,
      firstName: formState.firstName,
      lastName: formState.lastName,
      age: formState.age,
      gender: formState.selectedGender,
      neighborhood: formState.selectedNeighborhood,
    });

    alert(result);

    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
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
        value={formState.age.toString()}
        keyboardType="numeric"
        onChangeText={(input) => handleChange("age", Number(input))}
      />
      <RegisterDropdown
        listItem={genderList}
        setItem={(id) => handleChange("selectedGender", id)}
        placeHold={"Selecione seu Gênero"}
        renderProp={"genero"}
        defaultValue={formState.selectedGender}
        dropdownRef={dropdownRefGender}
      />
      <RegisterDropdown
        listItem={neighborhoodsList}
        setItem={(id) => handleChange("selectedNeighborhood", id)}
        placeHold={"Selecione seu Bairro"}
        renderProp={"bairro"}
        defaultValue={formState.selectedNeighborhood}
        dropdownRef={dropdownRefNeighborhood}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (
            formState.firstName !== "" &&
            formState.lastName !== "" &&
            formState.selectedGender !== 0 &&
            formState.selectedNeighborhood !== 0
          ) {
            await handleRegister();
            resertStates();
          } else {
            alert("Preencha o formulário corretamente");
          }
        }}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textInput: {
    height: 54,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#999",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#4f43f8",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
