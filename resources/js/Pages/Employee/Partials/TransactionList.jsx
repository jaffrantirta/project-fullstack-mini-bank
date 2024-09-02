import Paginate from "@/Components/Paginate";
import Table from "@/Components/Table";
import Td from "@/Components/Td";
import Th from "@/Components/Th";
import Tr from "@/Components/Tr";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function TransactionList(props) {
    return (
        <div className="overflow-x-auto p-5 md:p-10">
            <Table>
                <thead>
                    <Tr>
                        <Th>No.</Th>
                        <Th>Kode Ref.</Th>
                        <Th>Tanggal</Th>
                        <Th>Nominal</Th>
                        <Th>Tipe</Th>
                        <Th>Aksi</Th>
                    </Tr>
                </thead>
                <tbody>
                    {props.transactions.data.length > 0 ? (
                        props.transactions.data.map((transaction, index) => (
                            <Tr key={index}>
                                <Td>{props.transactions.from + index}</Td>
                                <Td>{transaction.meta.code}</Td>
                                <Td>
                                    {moment(transaction.meta.date).format("LL")}
                                </Td>
                                <Td className={"text-right"}>
                                    Rp.{transaction.amount}
                                </Td>
                                <Td>
                                    {transaction.type == "deposit"
                                        ? "debit"
                                        : "kredit"}
                                </Td>
                                <Td className={"flex gap-3"}>
                                    <Link
                                        className="hover:bg-gray-200 p-2 "
                                        href={route(
                                            "transaction.show",
                                            transaction.id
                                        )}
                                    >
                                        <ArrowRightIcon className="h-5" />
                                    </Link>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={6} className={"text-center"}>
                                Tidak ada data.
                            </Td>
                        </Tr>
                    )}
                </tbody>
            </Table>
            <Paginate className={"mt-5"} data={props.transactions} />
        </div>
    );
}
