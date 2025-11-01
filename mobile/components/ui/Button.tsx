import { ReactNode } from "react";
import { Button, ButtonProps } from "react-native-paper";

interface IButtonProps extends ButtonProps {
  icon?: string;
  onPress: () => void;
  children: ReactNode;
}

const Btn = ({ icon, onPress, children, ...props }: IButtonProps) => {
  return (
    <Button {...props} icon={icon ? icon : ""} onPress={onPress}>
      {children}
    </Button>
  );
};

export default Btn;
