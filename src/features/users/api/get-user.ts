import { api } from "@/lib/api";
import { User } from "../types/user";

export interface GetUserRequest {
	id: number;
}

export interface GetUserResponse {
	data: User;
}

export const getUser = ({ id }: GetUserRequest) =>
	api.get(`users/${id}`).json<GetUserResponse>();
