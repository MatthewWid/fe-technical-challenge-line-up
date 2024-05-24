import { api } from "@/lib/api";
import { User } from "../types/user";

export interface GetUsersRequest {
	page?: number;
}

export interface GetUsersResponse {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: User[];
}

export const getUsers = ({ page = 1 }: GetUsersRequest = {}) =>
	api
		.get("users", {
			searchParams: { page },
		})
		.json<GetUsersResponse>();
