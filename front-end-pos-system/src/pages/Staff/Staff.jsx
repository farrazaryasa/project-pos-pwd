import { Button, Table } from "flowbite-react";
import TableStaff from '../../components/staffComponent/tableStaff'
import { getStaff } from "../../api/staff";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StaffPage() {
    const [staff, setStaff] = useState([])

    const getStaffData = async () => {
        const result = await getStaff()
        setStaff(result)
    }

    useEffect(() => {
        getStaffData()
    }, [])

    return (
        <div className="pt-9">
            <div className="py-9 flex">
                <Link to={'/register'}>
                    <div>
                        <Button>Register New Cashier</Button>
                    </div>
                </Link>
            </div>
            <div className="">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>First Name</Table.HeadCell>
                        <Table.HeadCell>Last Name</Table.HeadCell>
                        <Table.HeadCell>Birthdate</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Edit
                            </span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">
                                Delete
                            </span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            staff?.data?.data?.map((value, index) => {
                                return (
                                    <TableStaff key={index} data={value} />
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}
