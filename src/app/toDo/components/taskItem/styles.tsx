import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  task: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: { fontSize: 16 },
  taskCompleted: { textDecorationLine: "line-through", color: "gray" },
  subtaskToggle: {
    color: "#007bff",
    marginVertical: 5,
    textAlign: "center",
  },
  subtaskContainer: { paddingLeft: 20 },
  subtaskInput: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  subtaskButton: {
    backgroundColor: "#28a745",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  subtaskButtonText: { color: "#fff", fontWeight: "bold" },
  subtaskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  subtaskText: { fontSize: 14 },
  subtaskCompleted: { textDecorationLine: "line-through", color: "gray" },
  removeSubtask: { color: "red", fontWeight: "bold" },
  fixedBackButtonContainer: {
    display: "flex",
    zIndex: 10,
    width: 50,
  },
});
