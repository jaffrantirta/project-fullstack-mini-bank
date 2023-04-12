import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import Td from '@/Components/Td';
import TextInput from '@/Components/TextInput';
import Th from '@/Components/Th';
import Tr from '@/Components/Tr';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Head, Link, useForm } from '@inertiajs/react'
import moment from 'moment';
import React from 'react'

export default function Index(props) {
    const { data, setData, get } = useForm({
        search: '',
    });

    const onSearch = (e) => {
        e.preventDefault();

        const search = data.search.trim();

        if (search) {
            get(route('transaction.index', { q: search }), {
                preserveScroll: true,
                onSuccess: (data) => {
                    setData(data);
                },
            });
        } else {
            get(route('transaction.index'), {
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
                    Transaksi
                </h2>
            }
        >
            <Head title='Transaksi' />

            <div className='grid grid-cols-1 md:grid-cols-2 p-10'>
                <form onSubmit={onSearch} className="flex gap-3">
                    <TextInput id="search" type="search" placeholder="Pencarian..." onChange={(e) => setData('search', e.target.value)} />
                    <PrimaryButton><MagnifyingGlassIcon className='h-5 mr-2' />Cari</PrimaryButton>
                </form>
            </div>



            <div className='overflow-x-auto p-5 md:p-10'>
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
                        {props.transactions.data.length > 0 ? props.transactions.data.map((transaction, index) => (
                            <Tr key={index}>
                                <Td>{props.transactions.from + index}</Td>
                                <Td>{transaction.meta.code}</Td>
                                <Td>{moment(transaction.meta.date).format('LL')}</Td>
                                <Td className={'text-right'}>Rp.{transaction.amount}</Td>
                                <Td>{transaction.type == 'deposit' ? 'debit' : 'kredit'}</Td>
                                <Td className={'flex gap-3'}>
                                    <Link className='hover:bg-gray-200 p-2 rounded-full' href={route('transaction.show', transaction.id)}>
                                        <ArrowRightIcon className='h-5' />
                                    </Link>
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
                <Paginate className={'mt-5'} data={props.transactions} />
            </div>

        </Authenticated>
    )
}
