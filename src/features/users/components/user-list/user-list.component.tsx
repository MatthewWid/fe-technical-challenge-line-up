import {
	Alert,
	Avatar,
	Button,
	Center,
	Container,
	Group,
	List,
	Loader,
	Title,
} from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../api/get-users";

export const UserList = () => {
	const navigate = useNavigate();
	const { pageId: pageIdParam } = useParams();
	const page = pageIdParam ? Number.parseInt(pageIdParam, 10) : 1;

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["users", page],
		queryFn: () => getUsers({ page }),
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		document.title = "User List";
	}, []);

	return (
		<Container mt="md">
			<Title mb="md">User List</Title>
			{isPending ? (
				<Center>
					<Loader />
				</Center>
			) : isError ? (
				<Alert title="Error" variant="light" color="red">
					{error.message}
				</Alert>
			) : (
				<>
					<List spacing="xs">
						{data.data.map((user) => (
							<List.Item
								key={user.id}
								icon={<Avatar src={user.avatar} />}
								style={{ cursor: "pointer" }}
								onClick={() => navigate(`/user/${user.id}`)}
							>
								{user.first_name} {user.last_name}
							</List.Item>
						))}
					</List>
					<Group>
						<Button
							variant="outline"
							color="dark"
							mt="md"
							disabled={page <= 1}
							onClick={() => navigate(`/users/${page - 1}`)}
						>
							Previous page
						</Button>
						<Button
							variant="outline"
							color="dark"
							mt="md"
							disabled={page >= data.total_pages}
							onClick={() => navigate(`/users/${page + 1}`)}
						>
							Next page
						</Button>
					</Group>
				</>
			)}
		</Container>
	);
};
