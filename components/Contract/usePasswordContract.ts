import { useMemo } from "react";
import { useConfig } from "wagmi";
import Password3Contract from "./Password3Contract";

export default function usePasswordContract() {
  const config = useConfig()
  const contract = useMemo(() => new Password3Contract(config), [config]) 
  return contract
}
