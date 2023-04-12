import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import TransactionList from './Partials/TransactionList';

export default function Show(props) {
    const employeeName = `${props.employee.user.name}`
    console.log(props);
    return (
        <Authenticated
            auth={props.auth}
            session={props.session}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {employeeName}
                </h2>
            }
        >
            <Head title={employeeName} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-10 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900 grid md:grid-cols-5 gap-5">
                            <img src={props.employee.user.avatar} className='w-full rounded-3xl aspect-square' alt={props.employee.user.name} />
                            <div className='md:col-span-4'>
                                <div className="text-gray-900 text-5xl font-bold">{props.employee.user.name}</div>
                                <div className="text-gray-900 font-bold">{props.employee.NIP}</div>
                                {props.employee.schools.map((school, index) => {
                                    return (
                                        <div key={index} className="text-gray-900 italic">{school.name}</div>
                                    )
                                })}
                                <div className="text-gray-900 italic">{props.employee.user.email}</div>
                                <div className="text-gray-900 text-3xl font-bold">Rp.{props.balance}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionList {...props} />


        </Authenticated>
    )
}
