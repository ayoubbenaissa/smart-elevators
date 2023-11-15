import axios from "axios";
import { ElevatorCallResponse } from "./elevators.types";
import { createHeadersWithAuth } from "./utils";

const API_URL = "http://localhost:5000/elevators/";

export const getAllElevators = async ({ token }: { token: string }): Promise<ElevatorCallResponse> => {
  const response = await axios.get<ElevatorCallResponse>(API_URL, { ...createHeadersWithAuth(token) });
  return response.data;
};
