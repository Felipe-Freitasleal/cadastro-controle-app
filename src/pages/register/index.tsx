import { useEffect, useState } from "react";
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
  const [selectedGender, setSelectedGender] = useState(0);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);

  const { getNeighborhoods, getGender, insertRegister } = useStorage();

  useEffect(() => {
    async function fetchData() {
      const neighborhoods = await getNeighborhoods();

      setNeighborhoodsList(neighborhoods);

      const genders = await getGender();

      setGenderList(genders);
    }

    fetchData();
  }, []);

  async function handleRegister() {
    if (
      firstName !== "" &&
      lastName !== "" &&
      selectedGender !== 0 &&
      selectedNeighborhood !== 0
    ) {
      const uuid = uuidGenerator();

      const result = await insertRegister({
        id: uuid,
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: selectedGender,
        neighborhood: selectedNeighborhood,
      });

      alert(result);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Nome"
        onChangeText={(input) => setFirstName(input)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Sobrenome"
        onChangeText={(input) => setLastName(input)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Idade"
        onChangeText={(input) => setAge(Number(input))}
      />
      <RegisterDropdown
        listItem={genderList}
        setList={setSelectedGender}
        placeHold={"Selecione seu Gênro"}
        renderProp={"genero"}
      />
      <RegisterDropdown
        listItem={neighborhoodsList}
        setList={setSelectedNeighborhood}
        placeHold={"Selecione seu bairro"}
        renderProp={"bairro"}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    fontSize: 20,
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
