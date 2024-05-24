import {
	Alert,
	Avatar,
	Center,
	Group,
	Loader,
	Table,
	Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/get-user";

export interface UserDetailsProps {
	id: number | null;
}

export const UserDetails = ({ id }: UserDetailsProps) => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["user", id],
		queryFn: () => getUser({ id: id as number }),
		enabled: id !== null,
	});

	return (
		<>
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
					<Group mb="md">
						<Avatar src={data.data.avatar} />
						<Title order={2}>
							{data.data.first_name} {data.data.last_name}
						</Title>
					</Group>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>ID</Table.Th>
								<Table.Th>Email</Table.Th>
								<Table.Th>First name</Table.Th>
								<Table.Th>Last name</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							<Table.Tr>
								<Table.Td>{data.data.id}</Table.Td>
								<Table.Td>{data.data.email}</Table.Td>
								<Table.Td>{data.data.first_name}</Table.Td>
								<Table.Td>{data.data.last_name}</Table.Td>
							</Table.Tr>
						</Table.Tbody>
					</Table>
				</>
			)}
		</>
	);
};
