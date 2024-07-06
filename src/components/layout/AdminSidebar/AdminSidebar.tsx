import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import transaction_order from '@icon/transaction_order_primary.svg'
import code_analysis from '@icon/code_analysis_solid_primary.svg'
// import ticket_managed from '@icon/ticket_managed_primary.svg'
import folder_managed from '@icon/folder_managed_primary.svg'
// import manage_accounts from '@icon/manage_accounts_primary.svg'

interface AdminSidebarProps {}

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
    return (
        <ul className="rounded-lg">
            {/* <li className=" rounded-t-lg bg-gray-3">
                <Link
                    href={''}
                    className="flex items-center border-b border-gray-3 p-4">
                    <Image
                        className="mr-2"
                        src={folder_managed}
                        alt={'ge to folder_manager'}
                        width={24}
                        height={24}
                    />
                    <p className="text-btn2 text-white">商品管理</p>
                </Link>
            </li> */}
            <li className=" rounded-t-lg bg-gray-3">
                <Link
                    href={'/admin/order'}
                    className="flex items-center border-b border-gray-3 p-4">
                    <Image
                        className="mr-2"
                        src={transaction_order}
                        alt={'ge to order manager'}
                        width={24}
                        height={24}
                    />
                    <p className="text-btn2 text-white hover:text-primary hover:text-shadow-sm">
                        訂單管理
                    </p>
                </Link>
            </li>
            {/* <li className=" bg-gray-1">
                <Link
                    href={''}
                    className="flex items-center border-b border-gray-3 p-4">
                    <Image
                        className="mr-2"
                        src={manage_accounts}
                        alt={'ge to member manager'}
                        width={24}
                        height={24}
                    />
                    <p className="text-btn2 text-white hover:text-primary hover:text-shadow-sm">
                        帳號管理
                    </p>
                </Link>
            </li> */}
            {/* <li className=" bg-gray-1">
                <Link
                    href={''}
                    className="flex items-center border-b border-gray-3 p-4">
                    <Image
                        className="mr-2"
                        src={ticket_managed}
                        alt={'ge to ticket manager'}
                        width={24}
                        height={24}
                    />
                    <p className="text-btn2 text-white hover:text-primary hover:text-shadow-sm">
                        票卷管理
                    </p>
                </Link>
            </li> */}
            <li className="rounded-b-lg bg-gray-1">
                <Link
                    href={'/admin/writeoff'}
                    className="flex items-center rounded-b-lg p-4">
                    <Image
                        className="mr-2"
                        src={code_analysis}
                        alt={'ge to sell manager'}
                        width={24}
                        height={24}
                    />
                    <p className="text-btn2 text-white hover:text-primary hover:text-shadow-sm">
                        票券核銷
                    </p>
                </Link>
            </li>
            <li className="rounded-b-lg bg-gray-1">
                <Link
                    href={'/admin/post'}
                    className="flex items-center rounded-b-lg p-4">
                    <Image
                        className="mr-2"
                        src={folder_managed}
                        alt={'ge to folder_manager'}
                        width={24}
                        height={24}
                    />
                    <p className="text-btn2 text-white hover:text-primary hover:text-shadow-sm">
                        新增商品
                    </p>
                </Link>
            </li>
        </ul>
    )
}

export default AdminSidebar
