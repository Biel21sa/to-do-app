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
  fixedBackButtonContainer: {
    display: "flex",
    zIndex: 10,
    width: 50,
  },
});

export default styles;
