export const UserRole = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  OWNER: 'owner',
  MEMBER: 'member',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const RoleOptions = [
  { value: UserRole.ADMIN, label: 'Admin' },
  { value: UserRole.SUPER_ADMIN, label: 'Super Admin' },
  { value: UserRole.OWNER, label: 'Owner' },
  { value: UserRole.MEMBER, label: 'Member' },
] as const;
