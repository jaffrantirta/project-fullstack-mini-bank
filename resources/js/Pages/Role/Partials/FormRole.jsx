import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";

export default function FormRole({ className, ...props }) {
    const {
        data,
        setData,
        errors,
        post,
        get,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        number_id: props.user?.NIS || props.user?.NIP || "",
        role_name: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("role.store"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const onCheck = (id) => {
        get(route("role.check.user", id));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Tambah Admin
                </h2>

                <p className="mt-1 text-sm text-gray-600"></p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="number_id"
                        value="Nomor identitas (NIS atau NIP)"
                    />

                    <div className="flex items-center">
                        <TextInput
                            id="number_id"
                            value={data.number_id}
                            onChange={(e) =>
                                setData("number_id", e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full"
                        />

                        <PrimaryButton
                            type="button"
                            className="ml-2"
                            onClick={() => onCheck(data.number_id)}
                        >
                            Check
                        </PrimaryButton>
                    </div>

                    <InputError message={errors.number_id} className="mt-2" />
                </div>

                {props.user && <div>Nama: {props.user.user.name}</div>}

                <div>
                    <InputLabel
                        htmlFor="role_name"
                        value="Peran akses sistem"
                    />

                    <Select
                        id="role_name"
                        name="role_name"
                        className="mt-1 block w-full"
                        value={data.role_name}
                        onChange={(e) => setData("role_name", e.target.value)}
                        required
                    >
                        <option value="">- Pilih Peran Hak Akses -</option>
                        <option value="school-admin">Admin Sekolah</option>
                        <option value="student-admin">Admin Siswa</option>
                    </Select>

                    <InputError message={errors.role_name} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
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
