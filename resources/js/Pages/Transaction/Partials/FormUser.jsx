import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from '@/Components/Select';

export default function FormUser({ className, ...props }) {
    const { data, setData, errors, post, put, get, reset, processing, recentlySuccessful } = useForm({
        user_account_number: props.user?.NIP || props.user?.NIS || '',
        transaction_code: props.transaction_code || '',
        transaction_date: new Date().toISOString().slice(0, 10),
        transaction_type: '',
        name: props.user?.user.name || '',
        email: props.user?.user.email || '',
        classroom: props.user?.classroom?.name || '',
        balance: props.balance || '',
    });
    console.log(props);

    const onSubmit = (e) => {
        e.preventDefault();
        get(route('transaction.show.user', data.user_account_number))
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Masukan No. Rekening</h2>

                <p className="mt-1 text-sm text-gray-600">

                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <InputLabel htmlFor="transaction_code" value="No. Transaksi" />

                        <TextInput
                            id="transaction_code"
                            value={data.transaction_code}
                            onChange={(e) => setData('transaction_code', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.transaction_code} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="transaction_date" value="Tanggal Transaksi" />

                        <TextInput
                            id="transaction_date"
                            value={data.transaction_date}
                            onChange={(e) => setData('transaction_date', e.target.value)}
                            type="date"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.transaction_date} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="user_account_number" value="No. Rekening" />

                        <TextInput
                            id="user_account_number"
                            value={data.user_account_number}
                            onChange={(e) => setData('user_account_number', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.user_account_number} className="mt-2" />
                        <InputError message={props.isEmpty ? 'No. Rekening tidak ditemukan' : ''} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4 mt-5">
                        <PrimaryButton disabled={processing}>Cari</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-gray-600">Tersimpan.</p>
                        </Transition>
                    </div>
                </div>

                <hr></hr>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                    <div>
                        <InputLabel htmlFor="name" value="Nama" />

                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="classroom" value="Kelas" />

                        <TextInput
                            id="classroom"
                            value={data.classroom}
                            onChange={(e) => setData('classroom', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.classroom} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="balance" value="Saldo" />

                        <TextInput
                            id="balance"
                            value={data.balance}
                            onChange={(e) => setData('balance', e.target.value)}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.balance} className="mt-2" />
                    </div>
                </div>
            </form>
        </section>
    );
}
