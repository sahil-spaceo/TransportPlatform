'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import GradientButton from '@/components/common/GradientButton';
import { AdminUser } from '@/modules/authentication/types/auth.types';

const TableContainer = styled.div`
  background: ${({ theme }) => theme.colors.gradients.card};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  overflow: hidden;
`;

const TableHeaderSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.gradients.secondary};
`;

const TableTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TableSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FilterContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: border-color ${({ theme }) => theme.animations.duration.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.functional.info};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  background: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.functional.info};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.background.elevated};
`;

const TableRow = styled.tr<{ $clickable?: boolean }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: background-color ${({ theme }) => theme.animations.duration.fast};

  ${({ $clickable }) => $clickable && `
    cursor: pointer;
    &:hover {
      background-color: rgba(59, 130, 246, 0.05);
    }
  `}

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th<{ $width?: string }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  text-align: left;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  ${({ $width }) => $width && `width: ${$width};`}
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const UserAvatar = styled.div<{ $src?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme, $src }) => 
    $src ? `url(${$src})` : theme.colors.gradients.primary};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserDetails = styled.div``;

const UserName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2px;
`;

const UserEmail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const StatusBadge = styled.span<{ $status: 'active' | 'inactive' | 'suspended' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ theme, $status }) => {
    switch ($status) {
      case 'active':
        return `
          background: ${theme.colors.functional.successGradient};
          color: ${theme.colors.functional.success};
          border: 1px solid ${theme.colors.functional.success}20;
        `;
      case 'inactive':
        return `
          background: ${theme.colors.solid.neutral[100]};
          color: ${theme.colors.text.tertiary};
          border: 1px solid ${theme.colors.border.medium};
        `;
      case 'suspended':
        return `
          background: ${theme.colors.functional.errorGradient};
          color: ${theme.colors.functional.error};
          border: 1px solid ${theme.colors.functional.error}20;
        `;
      default:
        return '';
    }
  }}
`;

const RoleBadge = styled.span<{ $level: number }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  ${({ theme, $level }) => {
    if ($level === 1) {
      return `
        background: ${theme.colors.gradients.primary};
        color: white;
      `;
    } else if ($level === 2) {
      return `
        background: ${theme.colors.functional.infoGradient};
        color: ${theme.colors.functional.info};
      `;
    } else {
      return `
        background: ${theme.colors.solid.neutral[100]};
        color: ${theme.colors.text.secondary};
      `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Pagination = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const PaginationInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PaginationControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-left: auto;
`;

// Mock data for demonstration
const mockUsers: AdminUser[] = [
  {
    id: '1',
    email: 'john.admin@flexflow.com',
    firstName: 'John',
    lastName: 'Smith',
    role: { id: '1', name: 'Super Admin', description: 'Full access', level: 1, permissions: ['*'] },
    permissions: [{ id: '1', resource: '*', actions: ['*'], scope: 'global' }],
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: '2',
    email: 'sarah.manager@flexflow.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: { id: '2', name: 'Operations Manager', description: 'Operations access', level: 2, permissions: ['operations.*'] },
    permissions: [{ id: '2', resource: 'operations', actions: ['read', 'write'], scope: 'global' }],
    isActive: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-07-18'),
  },
  {
    id: '3',
    email: 'mike.support@flexflow.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: { id: '3', name: 'Support Agent', description: 'Support access', level: 3, permissions: ['support.*'] },
    permissions: [{ id: '3', resource: 'support', actions: ['read'], scope: 'regional' }],
    isActive: false,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-07-15'),
  },
];

interface UserTableProps {
  onUserClick?: (user: AdminUser) => void;
  onEditUser?: (user: AdminUser) => void;
  onDeleteUser?: (user: AdminUser) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  onUserClick,
  onEditUser,
  onDeleteUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    const matchesRole = roleFilter === 'all' || user.role.name === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'active' : 'inactive';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <TableContainer>
      <TableHeaderSection>
        <TableTitle>User Management</TableTitle>
        <TableSubtitle>Manage admin users, roles, and permissions</TableSubtitle>
      </TableHeaderSection>

      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </FilterSelect>

        <FilterSelect
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Operations Manager">Operations Manager</option>
          <option value="Support Agent">Support Agent</option>
        </FilterSelect>

        <GradientButton
          variant="primary"
          size="small"
          onClick={() => console.log('Add user')}
        >
          Add User
        </GradientButton>
      </FilterContainer>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader $width="300px">User</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Last Login</TableHeader>
            <TableHeader>Created</TableHeader>
            <TableHeader $width="150px">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              $clickable={!!onUserClick}
              onClick={() => onUserClick?.(user)}
            >
              <TableCell>
                <UserInfo>
                  <UserAvatar>
                    {getInitials(user.firstName, user.lastName)}
                  </UserAvatar>
                  <UserDetails>
                    <UserName>{user.firstName} {user.lastName}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                  </UserDetails>
                </UserInfo>
              </TableCell>
              <TableCell>
                <RoleBadge $level={user.role.level}>
                  {user.role.name}
                </RoleBadge>
              </TableCell>
              <TableCell>
                <StatusBadge $status={getStatusText(user.isActive)}>
                  {getStatusText(user.isActive)}
                </StatusBadge>
              </TableCell>
              <TableCell>
                {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
              </TableCell>
              <TableCell>
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <GradientButton
                    variant="secondary"
                    size="small"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onEditUser?.(user);
                    }}
                  >
                    Edit
                  </GradientButton>
                  <GradientButton
                    variant="error"
                    size="small"
                    onClick={(e) => {
                      e?.stopPropagation();
                      onDeleteUser?.(user);
                    }}
                  >
                    Delete
                  </GradientButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PaginationInfo>
          Showing {filteredUsers.length} of {mockUsers.length} users
        </PaginationInfo>
        <PaginationControls>
          <GradientButton
            variant="secondary"
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </GradientButton>
          <GradientButton
            variant="secondary"
            size="small"
            disabled={filteredUsers.length <= itemsPerPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </GradientButton>
        </PaginationControls>
      </Pagination>
    </TableContainer>
  );
};