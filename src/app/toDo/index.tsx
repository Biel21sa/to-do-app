import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import TaskItem, { Task } from "./components/taskItem";

export default function App() {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [category, setCategory] = useState("Pessoal");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [darkTheme, setDarkTheme] = useState(false);

  const categories = useMemo(
    () => ["Pessoal", "Trabalho", "Estudo", "Lazer"],
    []
  );

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("@tasks");
        if (storedTasks) setTasks(JSON.parse(storedTasks));

        const storedTheme = await AsyncStorage.getItem("@darkTheme");
        if (storedTheme !== null) setDarkTheme(storedTheme === "true");
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      }
    };

    loadPreferences();

    // Solicita permissão para notificações
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para notificações negada!");
      }
    })();
  }, []);

  const saveTasks = useCallback(async () => {
    try {
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas", error);
    }
  }, [tasks]);

  useEffect(() => {
    saveTasks();
  }, [tasks, saveTasks]);

  const scheduleNotification = useCallback(async (task: Task) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nova Tarefa Adicionada",
        body: task.text,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        repeats: false,
      },
    });
  }, []);

  const addTask = useCallback(() => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: task,
        completed: false,
        category,
        subtasks: [],
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTask("");
      scheduleNotification(newTask);
    }
  }, [task, category, scheduleNotification]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }, []);

  const modifySubtasks = useCallback(
    (
      taskId: string,
      modify: (subtasks: Task["subtasks"]) => Task["subtasks"]
    ) => {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, subtasks: modify(t.subtasks || []) } : t
        )
      );
    },
    []
  );

  const addSubtask = useCallback(
    (taskId: string, text: string) => {
      modifySubtasks(taskId, (subtasks) => [
        ...(subtasks || []),
        { id: Date.now().toString(), text, completed: false },
      ]);
    },
    [modifySubtasks]
  );

  const toggleSubtask = useCallback(
    (taskId: string, subtaskId: string) => {
      modifySubtasks(taskId, (subtasks) =>
        subtasks?.map((s) =>
          s.id === subtaskId ? { ...s, completed: !s.completed } : s
        )
      );
    },
    [modifySubtasks]
  );

  const removeSubtask = useCallback(
    (taskId: string, subtaskId: string) => {
      modifySubtasks(taskId, (subtasks) =>
        subtasks?.filter((s) => s.id !== subtaskId)
      );
    },
    [modifySubtasks]
  );

  const filteredTasks = useMemo(
    () =>
      filterCategory
        ? tasks.filter((t) => t.category === filterCategory)
        : tasks,
    [tasks, filterCategory]
  );

  const renderTask = useCallback(
    ({ item }: { item: Task }) => (
      <TaskItem
        item={item}
        toggleTask={toggleTask}
        removeTask={removeTask}
        addSubtask={addSubtask}
        toggleSubtask={toggleSubtask}
        removeSubtask={removeSubtask}
      />
    ),
    [toggleTask, removeTask, addSubtask, toggleSubtask, removeSubtask]
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkTheme ? "#333" : "#fff" },
      ]}
    >
      <TouchableOpacity
        style={styles.fixedBackButtonContainer}
        onPress={() => router.navigate("/")}
      >
        <FontAwesome
          name="arrow-left"
          size={25}
          style={{ color: darkTheme ? "#fff" : "#000" }}
        />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={[styles.title, { color: darkTheme ? "#fff" : "#000" }]}>
          To-Do List
        </Text>
        <TouchableOpacity
          style={styles.themeButton}
          onPress={() => {
            setDarkTheme((prev) => {
              const newTheme = !prev;
              AsyncStorage.setItem("@darkTheme", JSON.stringify(newTheme));
              return newTheme;
            });
          }}
        >
          <Text style={{ color: darkTheme ? "#fff" : "#000" }}>
            {darkTheme ? "Tema Claro" : "Tema Escuro"}
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkTheme ? "#555" : "#fff",
            color: darkTheme ? "#fff" : "#000",
          },
        ]}
        placeholder="Adicionar nova tarefa"
        placeholderTextColor={darkTheme ? "#ccc" : "#999"}
        value={task}
        onChangeText={setTask}
      />

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              category === item && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: darkTheme ? "#fff" : "#000" },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        <Text
          style={[styles.filterText, { color: darkTheme ? "#fff" : "#000" }]}
        >
          Filtrar por categoria:
        </Text>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                filterCategory === item && styles.selectedCategory,
              ]}
              onPress={() =>
                setFilterCategory(filterCategory === item ? null : item)
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: darkTheme ? "#fff" : "#000" },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </SafeAreaView>
  );
}
