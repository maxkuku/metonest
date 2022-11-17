export interface UserEntity {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  roles: [string];
}
