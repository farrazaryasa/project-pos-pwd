import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { getChartData } from "../../api/report";

// const data = [
// {
//     name: "2023-06-12",
//         uv: 12000,
//         // pv: 12000,
//     },
// {
//     name: "2023-06-13",
//         uv: 427500,
//         // pv: 439500,
//     },
// {
//     name: "2023-06-14",
//         uv: 12700,
//         // pv: 456500,
//     }
// ];


export default function ChartReport() {
    const [data, setData] = useState([])
    const [chart, setChart] = useState([])

    const chartData = async () => {
        const getData = await getChartData()

        if (getData) {
            setChart(getData.data);
        }
    }

    const chartPoint = () => {
        const chartPoint = chart?.data?.map((value, index) => {
            return (
                { name: value.Date, sales: value.total_transaction }
            )
        })

        setData(chartPoint)

        console.log('data => ', data);
    }

    useEffect(() => {
        chartData()
        chartPoint()
    }, [])
    return (
        <LineChart
            width={1000}
            height={500}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
        </LineChart>
    );
}
