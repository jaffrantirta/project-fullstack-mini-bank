import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import Paginate from '@/Components/Paginate';
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import Td from '@/Components/Td';
import Th from '@/Components/Th';
import Tr from '@/Components/Tr';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'

export default function SchoolAdmin(props) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const { data, setData, get, delete: destroy, processing, reset, hasErrors } = useForm({
        id: '',
        search: '',
        user_id: '',
        role_name: 'school-admin'
    });

    console.log(props);

    const closeModal = () => {
        setConfirmingDeletion(false);
        reset();
    };

    const deleteProcess = (e) => {
        e.preventDefault();

        destroy(route('role.destroy', data.user_id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    return (
        <div>
            <h2 className='px-10 text-xl font-bold'>Admin Sekolah</h2>
            <div className='overflow-x-auto p-5 md:p-10'>
                <Table>
                    <thead>
                        <Tr>
                            <Th>No.</Th>
                            <Th>Nomor Identitas (NIS/NIP)</Th>
                            <Th>Nama</Th>
                            <Th>Kelas/Sekolah</Th>
                            <Th>Aksi</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        {props.school_admins.data.length > 0 ? props.school_admins.data.map((user, index) => (
                            <Tr key={index}>
                                <Td>{props.school_admins.from + index}</Td>
                                <Td>{user.employee?.NIP || user.student?.NIS}</Td>
                                <Td>{user.name}</Td>
                                <Td>{user.student !== null ? `${user.student?.classroom.class} ${user.student?.classroom.name} - ${user.student?.classroom.school.name}` : user.employee?.schools?.map((school, index) => {
                                    return (
                                        <p key={school.id}>{index + 1}. {school.name}</p>
                                    )
                                })}</Td>
                                <Td className={'flex gap-3'}>
                                    <Link className='hover:bg-gray-200 p-2 rounded-full' onClick={(e) => {
                                        e.preventDefault();
                                        setData('user_id', user.id);
                                        setConfirmingDeletion(true);
                                    }}><TrashIcon className='h-5 text-red-400' /></Link>
                                </Td>
                            </Tr>
                        )) : (
                            <Tr>
                                <Td colSpan={4} className={'text-center'}>
                                    Tidak ada staff ditemukan.
                                </Td>
                            </Tr>
                        )}
                    </tbody>

                </Table>
                <Paginate className={'mt-5'} data={props.school_admins} />
            </div>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteProcess} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Yakin hapus?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Ketika dihapus, user tidak bisa mendapatkan akses ke admin dan perlu ditambahkan kembali.
                    </p>

                    {hasErrors && <InputError message={'Oops! Sepertinya ada kesalahan'} />}


                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Ya, Hapus!
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
