import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

interface InputProps extends TextInputProps {
  name: string;
  control: any;
  placeholder: string;
  label: string;
  formError?: string;
}

const Input = ({
  name,
  control,
  placeholder,
  label,
  formError,
  ...props
}: InputProps) => {
  console.log(formError);
  return (
    <View style={{ marginBottom: 10 }}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            {...props}
            mode="outlined"
            label={label}
            placeholder={placeholder}
            value={value}
            error={!!formError}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
        name={name}
      />

      {formError && <Text style={styles.error}>{formError}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: 300,
    marginVertical: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
});
