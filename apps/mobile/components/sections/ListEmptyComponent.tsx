import { Text, View } from "react-native";

function ListEmptyComponent() {
  return (
    <View
      style={{
        alignItems: "center",
        padding: 20,
        minHeight: 150,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 16, color: "#888" }}>
        Nenhum registro encontrado.
      </Text>
      <Text style={{ fontSize: 14, color: "#AAA", marginTop: 4 }}>
        Comece a adicionar suas emoções.
      </Text>
    </View>
  );
}

export default ListEmptyComponent;
