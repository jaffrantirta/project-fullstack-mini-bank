import { useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from '@/Components/Select';

export default function FormTransaction({ className, ...props }) {
    const { data, setData, errors, post, put, reset, processing, recentlySuccessful } = useForm({
        transaction_type: '',
        amount: '',
        account_id: '',
        user_id: props.user?.user.id,
        transaction_code: props.transaction_code || '',
    });
    const [final_balance, setFinal_balance] = useState(props.balance)
    console.log(props.user?.user.id, 'transaksi');
    console.log(props.balance, 'transaksi');

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('transaction.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Buat Transaksi Baru</h2>

                <p className="mt-1 text-sm text-gray-600">

                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <InputLabel htmlFor="transaction_type" value="Jenis Simpanan" />

                        <Select
                            id="transaction_type"
                            name="transaction_type"
                            className="mt-1 block w-full"
                            value={data.transaction_type}
                            onChange={(e) => setData('transaction_type', e.target.value)}
                            required
                        >
                            <option value="">Pilih Jenis Simpanan</option>
                            <option value="deposit">Debet</option>
                            <option value="withdraw">Kredit</option>
                        </Select>

                        <InputError message={errors.transaction_type} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="account_id" value="Kode Transaksi" />

                        <Select
                            id="account_id"
                            name="account_id"
                            className="mt-1 block w-full"
                            value={data.account_id}
                            onChange={(e) => setData('account_id', e.target.value)}
                            required
                        >
                            <option value="">Pilih Akun</option>
                            {props.accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                    {account.name}
                                </option>
                            ))}
                        </Select>

                        <InputError message={errors.transaction_date} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="amount" value="Jumlah" />

                        <TextInput
                            id="amount"
                            value={data.amount}
                            onChange={(e) => {
                                setData('amount', e.target.value)
                                if (data.transaction_type == 'deposit') {
                                    setFinal_balance(parseInt(props.balance) + parseInt(e.target.value))
                                }
                                if (data.transaction_type == 'withdraw') {
                                    setFinal_balance(parseInt(props.balance) - parseInt(e.target.value))
                                }
                            }}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.amount} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="final_balance" value="Saldo Akhir" />

                        <TextInput
                            id="final_balance"
                            value={final_balance}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError message={errors.final_balance} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-5">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
