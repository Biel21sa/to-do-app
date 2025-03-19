import React, { useState, memo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";

export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  subtasks?: Subtask[];
}

export interface TaskItemProps {
  item: Task;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addSubtask: (taskId: string, text: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  removeSubtask: (taskId: string, subtaskId: string) => void;
}

const TaskItem = memo(
  ({
    item,
    toggleTask,
    removeTask,
    addSubtask,
    toggleSubtask,
    removeSubtask,
  }: TaskItemProps) => {
    const [showSubtasks, setShowSubtasks] = useState(false);
    const [subtaskText, setSubtaskText] = useState("");

    const handleToggleSubtasks = useCallback(() => {
      setShowSubtasks((prev) => !prev);
    }, []);

    const handleAddSubtask = useCallback(() => {
      if (subtaskText.trim()) {
        addSubtask(item.id, subtaskText);
        setSubtaskText("");
      }
    }, [subtaskText, addSubtask, item.id]);

    return (
      <SafeAreaView>
        <TouchableOpacity
          style={styles.task}
          onPress={() => toggleTask(item.id)}
          onLongPress={() => removeTask(item.id)}
        >
          <Text
            style={[styles.taskText, item.completed && styles.taskCompleted]}
          >
            {item.text} ({item.category})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleSubtasks}>
          <Text style={styles.subtaskToggle}>
            {showSubtasks ? "Ocultar Subtarefas" : "Mostrar Subtarefas"}
          </Text>
        </TouchableOpacity>

        {showSubtasks && (
          <View style={styles.subtaskContainer}>
            <TextInput
              style={styles.subtaskInput}
              placeholder="Adicionar subtarefa"
              onChangeText={setSubtaskText}
              value={subtaskText}
              onSubmitEditing={handleAddSubtask}
            />
            <TouchableOpacity
              style={styles.subtaskButton}
              onPress={handleAddSubtask}
            >
              <Text style={styles.subtaskButtonText}>Adicionar Subtarefa</Text>
            </TouchableOpacity>

            {item.subtasks?.map((subtask) => (
              <View key={subtask.id} style={styles.subtaskItem}>
                <TouchableOpacity
                  onPress={() => toggleSubtask(item.id, subtask.id)}
                >
                  <Text
                    style={[
                      styles.subtaskText,
                      subtask.completed && styles.subtaskCompleted,
                    ]}
                  >
                    {subtask.text}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onLongPress={() => removeSubtask(item.id, subtask.id)}
                >
                  <Text style={styles.removeSubtask}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </SafeAreaView>
    );
  }
);

export default TaskItem;
