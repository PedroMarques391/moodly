import { picker } from "@/styles/picker.styles";
import { theme } from "@/theme/theme";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { Platform, View } from "react-native";
import { HelperText, Text } from "react-native-paper";

type PickerProps = {
  control: any;
  name: string;
  label: string;
  items: { label: string; value: string }[];
  formError?: string;
};

export default function Picker({
  control,
  name,
  label,
  items,
  formError,
}: PickerProps): React.JSX.Element {
  return (
    <View style={picker.container}>
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontWeight: "600",
          marginBottom: 6,
          fontSize: 14,
          marginLeft: 4,
        }}
      >
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View
            style={[
              picker.pickerContainer,
              formError ? { borderColor: theme.colors.error } : null,
            ]}
          >
            <NativePicker
              selectedValue={value}
              onValueChange={onChange}
              mode="dropdown"
              style={[
                picker.picker,
                Platform.OS === "android" && {
                  color: theme.colors.textPrimary,
                },
              ]}
              dropdownIconColor={theme.colors.primary}
              itemStyle={{ fontSize: 16, color: theme.colors.primary }}
            >
              {items.map((item) => (
                <NativePicker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  color={
                    item.value === ""
                      ? theme.colors.textSecondary
                      : theme.colors.textPrimary
                  }
                  style={{ fontSize: 14 }}
                />
              ))}
            </NativePicker>
          </View>
        )}
      />

      <HelperText type="error" visible={!!formError}>
        {formError}
      </HelperText>
    </View>
  );
}
