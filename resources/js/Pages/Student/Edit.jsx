import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import FormEmployee from "./Partials/FormStudent";

export default function Edit(props) {
    return (
        <Authenticated
            auth={props.auth}
            session={props.session}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Sekolah
                </h2>
            }
        >
            <Head title="Edit Sekolah" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow ">
                        <FormEmployee
                            isUpdate={true}
                            schools={props.schools}
                            employee={props.employee}
                            className="max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
