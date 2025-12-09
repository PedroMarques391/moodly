import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";

interface CalendarProps {
  show: boolean;
  date: Date;
  onChange: (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => void;
}

export function Calendar({ show, date, onChange }: CalendarProps) {
  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          maximumDate={date}
          is24Hour={true}
          onChange={onChange}
          negativeButton={{ label: "Cancelar", textColor: "red" }}
          positiveButton={{ label: "OK", textColor: "green" }}
        />
      )}
    </View>
  );
}
