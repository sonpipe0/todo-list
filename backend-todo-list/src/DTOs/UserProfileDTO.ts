import { User } from '../users/users.model';

export type UserDto = {
  username: string;
  name: string;
  lastname: string;
};

export function userToUserDto(user: User): UserDto {
  return {
    username: user.username,
    name: user.name,
    lastname: user.lastname,
  };
}

export default UserDto;
