import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Select from '@/Components/Select';

export default function FormClass({ className, ...props }) {
    const { data, setData, errors, post, put, reset, processing, recentlySuccessful } = useForm({
        name: props.classroom?.name || '',
        class: props.classroom?.class || '',
        school_id: props.classroom?.school_id || '',
        year: props.classroom?.year || '',
    });
    console.log(props);

    const onSubmit = (e) => {
        e.preventDefault();
        props.isUpdate ?
            put(route('classroom.update', props.classroom.id))
            :
            post(route('classroom.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Kelas</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Masukan data kelas
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
                    <InputLabel htmlFor="class" value="Kelas (masukan 'alumni' jika telas lulus" />

                    <TextInput
                        id="class"
                        value={data.class}
                        onChange={(e) => setData('class', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.class} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="year" value="Tahun" />

                    <TextInput
                        id="year"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.year} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="school_id" value="Sekolah" />

                    <Select
                        id="school_id"
                        name="school_id"
                        className="mt-1 block w-full"
                        value={data.school_id}
                        onChange={(e) => setData('school_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih sekolah</option>
                        {props.schools.map((school) => (
                            <option key={school.id} value={school.id}>{school.name}</option>
                        ))}
                    </Select>


                    <InputError className="mt-2" message={errors.school_id} />
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
