import abi from "../contracts/ProjectGame.json";
import type { ProjectGame } from "../contracts/types/ProjectGame";
import useContract from "./useContract";

const CONTRACT_ADDRESS = "0xCB791C460c82D6968977C09803347F6113a30c71"

export default function useProjectGameContract() {
  return useContract<ProjectGame>(CONTRACT_ADDRESS, abi.abi);
}