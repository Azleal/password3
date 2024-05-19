import { useConfig } from "wagmi";
import Password3Contract from "./Password3Contract";

export default function usePasswordContract() {
  const config = useConfig()
  const contract = new Password3Contract(config)
  return contract
}
