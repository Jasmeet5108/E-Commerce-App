"use client"
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';


const useAuthRedirect = (isLoggedIn: boolean) => {
    const router = useRouter();
    const pathName = usePathname()

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if the code is running on the client
            const publicPaths = ['/', '/login'];
            const pathIsPublic = publicPaths.includes(pathName);

            if (isLoggedIn && pathIsPublic) {
                router.push('/dashboard');
            } else if (!isLoggedIn && !pathIsPublic) {
                router.push('/login');
            }
        }
    }, [isLoggedIn, router]);
};

export default useAuthRedirect;
