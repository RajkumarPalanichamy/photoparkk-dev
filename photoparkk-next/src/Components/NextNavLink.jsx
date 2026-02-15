'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NextNavLink({ href, exact = false, children, className, activeClassName = '' }) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    // If function is passed as className (common in NavLink), handle it
    const derivedClassName = typeof className === 'function'
        ? className({ isActive })
        : `${className} ${isActive ? activeClassName : ''}`;

    return (
        <Link href={href} className={derivedClassName}>
            {children}
        </Link>
    );
}
