import {
	Alert,
	Avatar,
	Button,
	Center,
	Container,
	Group,
	List,
	Loader,
	Modal,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUsers } from "../../api/get-users";
import { UserDetails } from "../user-details";

export const UserList = () => {
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [page, setPage] = useState(1);
	const [opened, { open, close }] = useDisclosure();

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["users", page],
		queryFn: () => getUsers({ page }),
		placeholderData: keepPreviousData,
	});

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
								onClick={() => {
									setSelectedUserId(user.id);
									open();
								}}
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
							onClick={() => setPage((prevPage) => prevPage - 1)}
						>
							Previous page
						</Button>
						<Button
							variant="outline"
							color="dark"
							mt="md"
							disabled={page >= data.total_pages}
							onClick={() => setPage((prevPage) => prevPage + 1)}
						>
							Next page
						</Button>
					</Group>
				</>
			)}
			<Modal opened={opened} onClose={close} title="User Details">
				<UserDetails id={selectedUserId} />
			</Modal>
		</Container>
	);
};
