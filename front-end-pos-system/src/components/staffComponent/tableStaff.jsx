import { Table } from "flowbite-react";



export default function TableStaff(props) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {props.data.id}
            </Table.Cell>
            <Table.Cell>
                {props.data.first_name}
            </Table.Cell>
            <Table.Cell>
                {props.data.last_name}
            </Table.Cell>
            <Table.Cell>
                {props.data.birthdate}
            </Table.Cell>
            <Table.Cell>
                {props.data.email}
            </Table.Cell>
            <Table.Cell>
                {props.data.role}
            </Table.Cell>
            <Table.Cell>
                <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                    <p>
                        Edit
                    </p>
                </a>
            </Table.Cell>
            <Table.Cell>
                {
                    props.data.role === 'admin' ? '' :
                        <a
                            className="font-medium text-red-600 hover:underline dark:text-cyan-500"
                        >
                            <p>
                                Delete
                            </p>
                        </a>
                }
            </Table.Cell>
        </Table.Row>

    )
}
