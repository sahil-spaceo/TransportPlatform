'use client';

import React from 'react';
import { ProtectedRoute } from '@/modules/authentication/components/ProtectedRoute';
import AdminLayout from '@/components/layout/AdminLayout';
import MainContent from '@/components/layout/MainContent';
import { UserTable } from '@/modules/user-management/components/UserTable';
import { AdminUser } from '@/modules/authentication/types/auth.types';

export default function UsersPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Users', icon: 'users' },
  ];

  const handleUserClick = (user: AdminUser) => {
    console.log('User clicked:', user);
    // Navigate to user detail page or open modal
  };

  const handleEditUser = (user: AdminUser) => {
    console.log('Edit user:', user);
    // Open edit user modal or navigate to edit page
  };

  const handleDeleteUser = (user: AdminUser) => {
    console.log('Delete user:', user);
    // Open confirmation modal
  };

  return (
    <ProtectedRoute requiredPermissions={['users.view']}>
      <AdminLayout
        currentModule="users"
        pageTitle="User Management"
        breadcrumbs={breadcrumbs}
      >
        <MainContent
          title="User Management"
          breadcrumbs={breadcrumbs}
        >
          <UserTable
            onUserClick={handleUserClick}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        </MainContent>
      </AdminLayout>
    </ProtectedRoute>
  );
}