import React from 'react'
import { BoltIcon, BuildingStorefrontIcon, ChartBarSquareIcon, DocumentDuplicateIcon, DocumentPlusIcon, FingerPrintIcon, HomeModernIcon, RectangleStackIcon, UsersIcon } from '@heroicons/react/24/solid'
import SideLink from './SideLink'
import ApplicationLogo from './ApplicationLogo'

export default function Sidebar(props) {
    return (
        <div className="hidden flex-col w-64 bg-gray-800 h-screen md:flex">
            <div className="fixed inset-y-0 left-0 w-64 bg-white border-r">
                <div className="flex items-center justify-center mt-8">
                    <ApplicationLogo className='block h-9 w-auto fill-current text-gray-800' />
                </div>
                <div className="h-full overflow-y-auto">
                    <nav className="mt-10 flex flex-col pb-16">
                        <SideLink href={route('dashboard.index')} active={route().current('dashboard.index')}>
                            <BoltIcon className='h-6 mr-3' />
                            <span className="text-gray-800 font-medium">Dashboard</span>
                        </SideLink>
                        {props.session.roles && props.session.roles.some(role => role.name === 'super-admin') && (
                            <>
                                <SideLink href={route('school.index')} active={route().current('school.index')}>
                                    <HomeModernIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Sekolah</span>
                                </SideLink>
                                <SideLink href={route('employee.index')} active={route().current('employee.index')}>
                                    <UsersIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Staff Sekolah</span>
                                </SideLink>
                                <SideLink href={route('role.index')} active={route().current('role.index')}>
                                    <FingerPrintIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Hak akses</span>
                                </SideLink>
                                <SideLink href={route('account.index')} active={route().current('account.index')}>
                                    <RectangleStackIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Akun Transaksi</span>
                                </SideLink>
                            </>
                        )}

                        {props.session.roles && props.session.roles.some(role => role.name === 'super-admin' || role.name === 'school-admin') && (
                            <>
                                <SideLink href={route('classroom.index')} active={route().current('classroom.index')}>
                                    <BuildingStorefrontIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Kelas</span>
                                </SideLink>
                                <SideLink href={route('student.index')} active={route().current('student.index')}>
                                    <UsersIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Siswa</span>
                                </SideLink>
                            </>
                        )}


                        {props.session.roles && props.session.roles.some(role => role.name === 'super-admin' || role.name === 'student-admin' || role.name === 'school-admin') && (
                            <>
                                <SideLink href={route('transaction.create')} active={route().current('transaction.create')}>
                                    <DocumentPlusIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Buat Transaksi</span>
                                </SideLink>
                                <SideLink href={route('transaction.index')} active={route().current('transaction.index')}>
                                    <DocumentDuplicateIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Transaksi</span>
                                </SideLink>
                            </>
                        )}

                        {props.session.roles && props.session.roles.some(role => role.name === 'super-admin' || role.name === 'school-admin') && (
                            <>
                                <SideLink href={route('report.index')} active={route().current('report.index')}>
                                    <ChartBarSquareIcon className='h-6 mr-3' />
                                    <span className="text-gray-600">Laporan</span>
                                </SideLink>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </div>

    )
}
