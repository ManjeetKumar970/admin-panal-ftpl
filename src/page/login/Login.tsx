'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginTypes, loginValidationTypes } from './types/types';
import { loginService } from './services';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import onlyLogo from '../../assets/main_only_logo.png';
import Cookies from 'js-cookie';
import { loginSchema } from './validation';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { AxiosError } from 'axios';

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<loginTypes>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<loginValidationTypes>({
    email: '',
    password: ''
  });

  const validateForm = () => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const errorMessages: loginValidationTypes = {};
      result.error.errors.forEach((err) => {
        errorMessages[err.path[0]] = err.message;
      });
      setErrors(errorMessages);
      return false;
    }
    setErrors({});
    return true;
  };

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (response: any) => {
      if (response?.status === 'success') {
        Cookies.set('access_token', response?.data?.access_token, {
          expires: 30
        });
        router.push('/dashboard');
      }
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    loginMutation.mutate(formData, {
      onMutate: () => setIsLoading(true),
      onSettled: () => setIsLoading(false)
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl border border-gray-200 transition duration-300"
        >
          <div className="text-center">
            <Image
              src={onlyLogo}
              alt="Company Logo"
              width={800}
              height={64}
              priority
              className="mx-auto h-16 w-auto"
            />
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
              FTPL Admin
            </h2>
          </div>

          <form onSubmit={submitHandler} className="mt-6 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  required
                  autoComplete="email"
                  className={`w-full rounded-md border pl-10 pr-4 py-2 text-gray-900 shadow-sm focus:ring-primary_dark sm:text-sm ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-primary_dark'
                  }`}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.id]: e.target.value
                    }));
                    setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  required
                  autoComplete="current-password"
                  minLength={6}
                  className={`w-full rounded-md border pl-10 pr-10 py-2 text-gray-900 shadow-sm focus:ring-primary_dark sm:text-sm ${
                    errors.password
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-primary_dark'
                  }`}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.id]: e.target.value
                    }));
                    setErrors((prev) => ({ ...prev, [e.target.id]: '' }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {!isLoading ? 'Verify Email' : 'Loading....'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
