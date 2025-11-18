import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const item = await AsyncStorage.getItem("todos");
      if (item) setTodos(JSON.parse(item));
    };
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;
    const newTodos = [...todos, { id: Date.now().toString(), text: todo }];
    setTodos(newTodos);
  };

  const clearTodos = async () => {
    await AsyncStorage.removeItem("todos");
    setTodos([])
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your to do"
        value={todo}
        onChange={(e) => setTodo(e.nativeEvent.text)}
        style={styles.input}
      ></TextInput>
      <Button title="Add it" color="#000" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.list}>{item.text}</Text>}
      />
      <Button title="Clear All" color="red" onPress={clearTodos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 50,
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  list: {
    borderWidth: 2,
    padding: 10,
    marginTop: 8,
  },
});
