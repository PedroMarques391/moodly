import { Payload as JwtPayload } from "@moodly/core";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token: string): JwtPayload => {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
};

export default decodeToken;
