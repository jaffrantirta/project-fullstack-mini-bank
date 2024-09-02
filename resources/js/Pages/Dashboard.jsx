import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {
    console.log(props);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            session={props.session}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm p-10">
                        <h1 className="text-xl font-semibold">Total saldo</h1>
                        <h1 className="text-6xl font-bold">Rp.{props.total}</h1>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm p-10 grid gap-5 md:grid-cols-2">
                        <div>
                            <h1 className="text-xl font-semibold">
                                Total setor hari ini
                            </h1>
                            <h1 className="text-4xl font-bold text-green-600">
                                Rp.{props.deposit.total}
                            </h1>
                            <h1 className="text-xl italic font-semibold">
                                {props.deposit.count} transaksi
                            </h1>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">
                                Total tarik hari ini
                            </h1>
                            <h1 className="text-4xl font-bold text-red-600">
                                Rp.{props.withdraw.total}
                            </h1>
                            <h1 className="text-xl italic font-semibold">
                                {props.withdraw.count} transaksi
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
