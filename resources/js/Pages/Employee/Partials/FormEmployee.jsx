import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Checkbox from '@/Components/Checkbox';

export default function FormEmployee({ className, isUpdate = false, ...props }) {
    const { data, setData, errors, post, put, reset, processing, recentlySuccessful } = useForm({
        name: props.employee?.user.name || '',
        nip: props.employee?.NIP || '',
        email: props.employee?.user.email || '',
        school_ids: props.employee?.schools.map((school) => school.id) || [],
    });
    console.log(props);

    const onSubmit = (e) => {
        e.preventDefault();
        isUpdate ? put(route('employee.update', props.employee.id), {
            preserveScroll: true,
        }) :
            post(route('employee.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Staff Sekolah</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Masukan data staff sekolah
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama" />

                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="nip" value="Nomor Identitas" />

                    <TextInput
                        id="nip"
                        value={data.nip}
                        onChange={(e) => setData('nip', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.nip} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="school_ids" value="Pilih sekolah" />
                    {props.schools.map((school) => (
                        <label key={school.id} className="flex items-center">
                            <Checkbox
                                name="school_ids"
                                value={school.id}
                                checked={data.school_ids.includes(school.id)}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setData(
                                        'school_ids',
                                        checked
                                            ? [...data.school_ids, school.id]
                                            : data.school_ids.filter((id) => id !== school.id)
                                    );
                                }}
                            />
                            <span className="ml-2 text-sm text-gray-600">{school.name}</span>
                        </label>
                    ))}
                    <InputError message={errors.school_ids} className="mt-2" />
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
