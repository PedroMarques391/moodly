import { BaselineMood } from "../../models";

export interface updateUserDTO {
  name?: string;
  image?: string;
  bio?: string;
  baselineMood?: BaselineMood;
  triggers?: string;
  copingStrategies?: string;
  goals?: string;
}
