import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Select from '@/Components/Select';

export default function FormTotalTransaction({ className, ...props }) {
    const { data, setData, errors, processing } = useForm({
        start_date: new Date().toISOString().slice(0, 16),
        end_date: new Date().toISOString().slice(0, 16),
        type: '',
    });

    const submit = (e) => {
        e.preventDefault();
        location.href = route('report.total', data);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Laporan Total</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Menampilkan laporan dari tanggal yang dipilih
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="start_date" value="Tanggal mulai" />

                    <TextInput
                        id="start_date"
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        type="datetime-local"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.start_date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="end_date" value="Tanggal akhir" />

                    <TextInput
                        id="end_date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        type="datetime-local"
                        className="mt-1 block w-full"
                        required
                    />

                    <InputError message={errors.end_date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="type" value="Jenis Simpanan" />

                    <Select
                        id="type"
                        name="type"
                        className="mt-1 block w-full"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        required
                    >
                        <option value="">Pilih Jenis Simpanan</option>
                        <option value="deposit">Debet</option>
                        <option value="withdraw">Kredit</option>
                    </Select>

                    <InputError message={errors.type} className="mt-2" />
                </div>


                <div className="flex items-center gap-4">
                    {/* <Link href={route('report.total')}> */}
                    <PrimaryButton disabled={processing}>Download</PrimaryButton>
                    {/* </Link> */}
                </div>
            </form>
        </section>
    );
}
