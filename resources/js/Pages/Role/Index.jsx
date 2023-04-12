import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import Td from '@/Components/Td';
import TextInput from '@/Components/TextInput';
import Th from '@/Components/Th';
import Tr from '@/Components/Tr';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import SchoolAdmin from './Partials/SchoolAdmin';
import StudentAdmin from './Partials/StudentAdmin';

export default function Index(props) {
    return (
        <Authenticated
            auth={props.auth}
            session={props.session}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hak akses
                </h2>
            }
        >
            <Head title='Hak akses' />


            <div className='flex justify-end p-10'>
                <Link href={route('role.create')}><PrimaryButton><PlusIcon className='w-5 mr-3' /> Tambah</PrimaryButton></Link>
            </div>

            <SchoolAdmin {...props} />

            <StudentAdmin {...props} />

        </Authenticated>
    )
}
