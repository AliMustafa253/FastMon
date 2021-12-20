import abi from "../contracts/ProjectGame.json";
import type { ProjectGame } from "../contracts/types/ProjectGame";
import useContract from "./useContract";

const CONTRACT_ADDRESS = "0xD89657f1961FECFC17403Ae8f138839bF982beb5"

export default function useProjectGameContract() {
  return useContract<ProjectGame>(CONTRACT_ADDRESS, abi.abi);
}