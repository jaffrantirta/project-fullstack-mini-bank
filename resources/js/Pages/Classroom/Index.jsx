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

export default function Index(props) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { data, setData, get, delete: destroy, processing, reset, hasErrors, errors } = useForm({
        id: '',
        search: '',
        message: '',
    });

    const closeModal = () => {
        setConfirmingDeletion(false);
        reset();
    };

    const deleteProcess = (e) => {
        e.preventDefault();

        destroy(route('classroom.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const onSearch = (e) => {
        e.preventDefault();

        const search = data.search.trim();

        if (search) {
            get(route('classroom.index', { q: search }), {
                preserveScroll: true,
                onSuccess: (data) => {
                    setData(data);
                },
            });
        } else {
            get(route('classroom.index'), {
                preserveScroll: true,
                onSuccess: (data) => {
                    setData(data);
                },
            });
        }
    }
    return (
        <Authenticated
            auth={props.auth}
            session={props.session}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kelas
                </h2>
            }
        >
            <Head title='Kelas' />

            <div className='grid grid-cols-1 md:grid-cols-2 p-10'>
                <form onSubmit={onSearch} className="flex gap-3">
                    <TextInput id="search" type="search" placeholder="Pencarian..." onChange={(e) => setData('search', e.target.value)} />
                    <PrimaryButton><MagnifyingGlassIcon className='h-5 mr-2' />Cari</PrimaryButton>
                </form>
                <div className='flex justify-end'>
                    <Link href={route('classroom.create')}><PrimaryButton><PlusIcon className='w-5 mr-3' /> Tambah</PrimaryButton></Link>
                </div>
            </div>



            <div className='overflow-x-auto p-5 md:p-10'>
                <Table>
                    <thead>
                        <Tr>
                            <Th>No.</Th>
                            <Th>Kelas</Th>
                            <Th>Nama</Th>
                            <Th>Tahun</Th>
                            <Th>Sekolah</Th>
                            <Th>Aksi</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {props.classrooms.data.length > 0 ? props.classrooms.data.map((classroom, index) => (
                            <Tr key={index}>
                                <Td>{props.classrooms.from + index}</Td>
                                <Td>{classroom.class}</Td>
                                <Td>{classroom.name}</Td>
                                <Td>{classroom.year}</Td>
                                <Td>{classroom.school.name}</Td>
                                <Td className={'flex gap-3'}>
                                    <Link className='hover:bg-gray-200 p-2 rounded-full' href={route('classroom.edit', classroom.id)}>
                                        <PencilIcon className='h-5' />
                                    </Link>
                                    <Link className='hover:bg-gray-200 p-2 rounded-full' onClick={(e) => {
                                        e.preventDefault();
                                        setData('id', classroom.id);
                                        setConfirmingDeletion(true);
                                    }}><TrashIcon className='h-5 text-red-400' /></Link>
                                </Td>
                            </Tr>
                        )) : (
                            <Tr>
                                <Td colSpan={5} className={'text-center'}>
                                    Tidak ada data.
                                </Td>
                            </Tr>
                        )}
                    </tbody>

                </Table>
                <Paginate className={'mt-5'} data={props.classrooms} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteProcess} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Yakin hapus?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Hanya bisa menghapus kelas yang tidak memiliki siswa.
                    </p>

                    {hasErrors && <InputError message={errors.message} />}


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Ya, Hapus!
                        </DangerButton>
                    </div>
                </form>
            </Modal>

        </Authenticated>
    )
}
