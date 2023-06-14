import { Table } from "flowbite-react";
import ChartReport from "../../components/report/chart";
import { useEffect, useState } from "react";
import { getTransactionData } from "../../api/report";
import TableReport from "../../components/report/tableReport";



export default function Report() {
    const [data, setData] = useState([])

    const transactionData = async () => {
        const result = await getTransactionData()

        if (result) {
            setData(result.data);
        }
    }

    useEffect(() => {
        transactionData()
    }, [])
    return (
        <div className="flex flex-col gap-9 py-9 items-center">
            <div className="font-bold text-2xl">
                SALES REPORT
            </div>
            <div className="flex items-center justify-center">
                <ChartReport />
            </div>
            <div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Order ID</Table.HeadCell>
                        <Table.HeadCell>Product ID</Table.HeadCell>
                        <Table.HeadCell>Product Name</Table.HeadCell>
                        <Table.HeadCell>Product Price</Table.HeadCell>
                        <Table.HeadCell>Quantity</Table.HeadCell>
                        <Table.HeadCell>Transaction Date</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {data?.data?.map((value, index) => {
                            return (
                                <TableReport key={index} data={value} />
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}
