import NavLink from '@/Components/NavLink';
import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import Td from '@/Components/Td';
import Th from '@/Components/Th';
import Tr from '@/Components/Tr';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Index(props) {
    console.log(props);
    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sekolah
                </h2>
            }
            session={props.session}
        >
            <Head title='Sekolah' />

            <div className='flex justify-center md:justify-end p-10'>
                <Link href={route('school.create')}><PrimaryButton><PlusIcon className='w-5 mr-3' /> Tambah</PrimaryButton></Link>
            </div>

            <div className='overflow-x-auto p-5 md:p-10'>
                <Table>
                    <thead>
                        <Tr>
                            <Th>No.</Th>
                            <Th>Nama</Th>
                            <Th>Alamat</Th>
                            <Th>Aksi</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {props.schools.data.map((school, index) => (
                            <Tr key={index}>
                                <Td>{props.schools.from + index}</Td>
                                <Td>{school.name}</Td>
                                <Td>{school.address}</Td>
                                <Td className={'flex'}>
                                    <Link href={route('school.edit', { 'school': school.id })}><PencilIcon className='w-5' /></Link>
                                    <Link><TrashIcon className='w-5 text-red-400' /></Link>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate className={'mt-5'} data={props.schools} />
            </div>
        </Authenticated>
    )
}
