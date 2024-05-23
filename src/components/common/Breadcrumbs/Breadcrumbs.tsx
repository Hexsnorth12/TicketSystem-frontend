'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { pathMap } from '@/definitions/pathMap'

interface BreadcrumbsProps {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
    const pathname = usePathname()
    const [paths, setPaths] = useState<string[]>([])

    useEffect(() => {
        const processPaths: string[] = pathname.split('/').map((path) => {
            if (path === '') return pathMap['home']
            return pathMap[path]
        })
        setPaths(processPaths)
    }, [pathname])

    const renderBreadcrumb = () => {
        return paths.map((path, i) => (
            <li className="text-white" key={path + i}>
                <Link
                    href={`/user/${path}`}
                    className={clsx('text-small2 leading-150 tracking-wide', {
                        'text-gray-5': i === paths.length - 1,
                    })}>
                    {path}
                </Link>
                {i !== paths.length - 1 ? (
                    <span className="mx-2 text-small2 text-gray-5">/</span>
                ) : null}
            </li>
        ))
    }

    return <ol className="hidden md:flex">{renderBreadcrumb()}</ol>
}

export default Breadcrumbs
