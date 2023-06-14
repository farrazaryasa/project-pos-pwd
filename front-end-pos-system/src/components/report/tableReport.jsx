import { Table } from "flowbite-react";


export default function TableReport(props) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {props.data.order_id}
            </Table.Cell>
            <Table.Cell>
                {props.data.product_id}
            </Table.Cell>
            <Table.Cell>
                {props?.data?.product?.name}
            </Table.Cell>
            <Table.Cell>
                {props?.data?.price}
            </Table.Cell>
            <Table.Cell>
                {props?.data?.quantity}
            </Table.Cell>
            <Table.Cell>
                {props?.data?.createdAt}
            </Table.Cell>
        </Table.Row>
    )
}

