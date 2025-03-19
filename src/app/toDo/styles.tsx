import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  themeButton: { padding: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  selectedCategory: { backgroundColor: "#007bff" },
  categoryText: { fontWeight: "bold" },
  filterContainer: { marginTop: 10 },
  filterText: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  fixedBackButtonContainer: {
    display: "flex",
    zIndex: 10,
    width: 50,
  },
});

export default styles;
