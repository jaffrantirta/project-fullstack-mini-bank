import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Select from "@/Components/Select";

export default function FormStudent({ className, ...props }) {
    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: props.student?.user.name || "",
        nis: props.student?.NIS || "",
        email: props.student?.user.email || "",
        classroom_id: props.student?.classroom_id || "",
    });
    console.log(props);

    const onSubmit = (e) => {
        e.preventDefault();
        props.isUpdate
            ? put(route("student.update", props.student.id))
            : post(route("student.store"), {
                  preserveScroll: true,
                  onSuccess: () => reset(),
              });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Siswa Sekolah
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Masukan data siswa sekolah
                </p>
            </header>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama" />

                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="nis" value="Nomor Identitas" />

                    <TextInput
                        id="nis"
                        value={data.nis}
                        onChange={(e) => setData("nis", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.nis} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="classroom_id" value="Kalas" />

                    <Select
                        id="classroom_id"
                        name="classroom_id"
                        className="mt-1 block w-full"
                        value={data.classroom_id}
                        onChange={(e) =>
                            setData("classroom_id", e.target.value)
                        }
                        required
                    >
                        <option value="">Pilih kelas</option>
                        {props.classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.class} {classroom.name}
                            </option>
                        ))}
                    </Select>

                    <InputError
                        className="mt-2"
                        message={errors.classroom_id}
                    />
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
