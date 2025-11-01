import { ReactNode } from "react";
import { Button } from "react-native-paper";

interface IButtonProps {
  icon?: string;
  mode: "text" | "outlined" | "contained";
  onPress: () => void;
  children: ReactNode;
}

const Btn = ({ icon, mode, onPress, children }: IButtonProps) => {
  return (
    <Button
      style={{ width: "60%" }}
      icon={icon ? icon : ""}
      mode={mode}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default Btn;
