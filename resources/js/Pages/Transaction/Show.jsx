import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import moment from 'moment';
import React, { useState } from 'react'

export default function Show(props) {
    const [transactionCode, setTransactionCode] = useState(`Transaksi ${props.transaction.meta.code}`)
    console.log(props);
    return (
        <Authenticated
            auth={props.auth}
            session={props.session}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {transactionCode}
                </h2>
            }
        >
            <Head title={transactionCode} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Transaksi pada {moment(props.transaction.meta.date).format('LL')}</div>
                        <div className="p-6 text-gray-900">Total: Rp.{props.transaction.amount_number_format}</div>
                        <div className="p-6 text-gray-900">Tipe transaksi: <span className='font-bold text-lg'>{props.transaction.type_att}</span></div>
                        <div className="p-6 text-gray-900">Diinput oleh: {props.transaction.meta.collected_by}</div>
                    </div>
                </div>
            </div>



        </Authenticated>
    )
}
