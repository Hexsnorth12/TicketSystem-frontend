'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { pathMap } from '@/definitions/pathMap'

interface BreadcrumbsProps {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = () => {
    const pathname = usePathname()
    const [paths, setPaths] = useState<{ [key: string]: string }[]>([])

    useEffect(() => {
        const processPaths: { [key: string]: string }[] = pathname
            .replace(/\/\d+$/, '')
            .split('/')
            .map((path) => {
                if (path === '')
                    return {
                        path: pathMap['home'].path,
                        name: pathMap['home'].name,
                    }
                return {
                    path: pathMap[path]?.path ?? '',
                    name: pathMap[path]?.name ?? '',
                }
            })
        console.log(processPaths)
        setPaths(processPaths)
    }, [pathname])

    const renderBreadcrumb = () => {
        return paths.map(({ path, name }, i) => (
            <li className="text-white" key={`${path}-${i}`}>
                <Link
                    href={`${path}`}
                    className={clsx(
                        'text-small2 leading-150 tracking-wide hover:text-primary',
                        {
                            'text-gray-5': i === paths.length - 1,
                        },
                    )}>
                    {name}
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
