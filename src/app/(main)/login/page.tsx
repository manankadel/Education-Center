// src/app/(main)/login/page.tsx
"use client";
import { AuthForm } from '@/components/modules/auth/AuthForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-32">
            <AuthForm />
        </div>
    );
};

export default LoginPage;