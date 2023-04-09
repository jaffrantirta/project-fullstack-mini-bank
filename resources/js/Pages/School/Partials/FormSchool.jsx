import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function FormSchool({ className, isUpdate = false, ...props }) {
    const { data, setData, errors, post, put, reset, processing, recentlySuccessful } = useForm({
        name: props.school?.name || '',
        address: props.school?.address || '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        isUpdate ? put(route('school.update', props.school.id), {
            preserveScroll: true,
        }) :
            post(route('school.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
            });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Sekolah</h2>

                <p className="mt-1 text-sm text-gray-600">

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
                    <InputLabel htmlFor="address" value="Alamat" />

                    <TextInput
                        isTextArea={true}
                        id="address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.address} className="mt-2" />
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
