import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";

export default function FormTransaction({ className, ...props }) {
    const { data, setData, errors, post, processing, recentlySuccessful } =
        useForm({
            transaction_type: "",
            amount: "",
            account_id: "",
            transaction_id: props.transaction_id || "",
            user_id: props.user?.user.id,
            transaction_code: props.transaction_code || "",
            transaction_date: new Date().toISOString().slice(0, 10),
        });
    const [final_balance, setFinal_balance] = useState(props.balance);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("transaction.store"), {
            onSuccess: ({ props }) =>
                console.log(props.transaction_id, "response"),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Buat Transaksi Baru
                </h2>

                <p className="mt-1 text-sm text-gray-600"></p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <InputLabel
                            htmlFor="transaction_type"
                            value="Jenis Simpanan"
                        />

                        <Select
                            id="transaction_type"
                            name="transaction_type"
                            className="mt-1 block w-full"
                            value={data.transaction_type}
                            onChange={(e) =>
                                setData("transaction_type", e.target.value)
                            }
                            required
                        >
                            <option value="">Pilih Jenis Simpanan</option>
                            <option value="deposit">Kredit</option>
                            <option value="withdraw">Debit</option>
                        </Select>

                        <InputError
                            message={errors.transaction_type}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="transaction_date"
                            value="Tanggal Transaksi"
                        />

                        <TextInput
                            id="transaction_date"
                            value={data.transaction_date}
                            onChange={(e) =>
                                setData("transaction_date", e.target.value)
                            }
                            type="date"
                            className="mt-1 block w-full"
                            {...(props.session.roles.some(
                                (role) =>
                                    role.name === "super-admin" ||
                                    role.name === "school-admin"
                            )
                                ? { disabled: false }
                                : { disabled: true })}
                        />

                        <InputError
                            message={errors.transaction_date}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="account_id"
                            value="Kode Transaksi"
                        />

                        <Select
                            id="account_id"
                            name="account_id"
                            className="mt-1 block w-full"
                            value={data.account_id}
                            onChange={(e) =>
                                setData("account_id", e.target.value)
                            }
                            required
                        >
                            <option value="">Pilih Akun</option>
                            {props.accounts
                                .filter(
                                    (account) =>
                                        account.type === data.transaction_type
                                )
                                .map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.code} - {account.name}
                                    </option>
                                ))}
                        </Select>

                        <InputError
                            message={errors.transaction_date}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="amount" value="Jumlah" />

                        <TextInput
                            id="amount"
                            value={data.amount}
                            onChange={(e) => {
                                setData("amount", e.target.value);
                                if (data.transaction_type == "deposit") {
                                    setFinal_balance(
                                        parseInt(props.balance) +
                                            parseInt(e.target.value)
                                    );
                                }
                                if (data.transaction_type == "withdraw") {
                                    setFinal_balance(
                                        parseInt(props.balance) -
                                            parseInt(e.target.value)
                                    );
                                }
                            }}
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.amount} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="final_balance"
                            value="Saldo Akhir"
                        />

                        <TextInput
                            id="final_balance"
                            value={final_balance}
                            type="text"
                            className="mt-1 block w-full"
                            disabled
                        />

                        <InputError
                            message={errors.final_balance}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-5">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>

                    {props.transaction_id ? (
                        <Link href={`/print/${props.transaction_id}`}>
                            <PrimaryButton>Print</PrimaryButton>
                        </Link>
                    ) : (
                        <></>
                    )}

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
