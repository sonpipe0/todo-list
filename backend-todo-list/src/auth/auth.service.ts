import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { userToUserDto } from '../DTOs/UserProfileDTO';
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';

type hashTuple = {
  hash: string;
  salt: string;
};

async function findUserByUsername(username: string): Promise<User | null> {
  return await User.findOne({
    where: { username: username },
  });
}

async function comparePassword(
  password: string,
  hash: string,
  salt: string,
): Promise<boolean> {
  return await new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password + salt, hash, (err, same) => {
      if (err) {
        reject(err);
      } else {
        resolve(same);
      }
    });
  });
}

async function hashPassword(password: string): Promise<hashTuple> {
  const saltRounds = 10;
  const salt = uuid();

  try {
    const hash = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password + salt, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    return { hash, salt };
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

async function checkIfUserExists(username: string): Promise<boolean> {
  const user: User | null = await User.findOne({
    where: { username: username },
  });

  return !!user;
}

async function createUser(
  username: string,
  firstName: string,
  lastName: string,
  hash: string,
  salt: string,
): Promise<User> {
  const user = new User();
  user.username = username;
  user.name = firstName;
  user.lastname = lastName;
  user.hash = hash;
  user.salt = salt;

  try {
    await user.save();
    return user;
  } catch {
    throw new Error('Unexpected Error');
  }
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(
    username: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    const exists: boolean = await checkIfUserExists(username);
    if (exists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const pair: hashTuple = await hashPassword(password);
    const hash: string = pair.hash;
    const salt: string = pair.salt;

    await createUser(username, firstName, lastName, hash, salt);

    return {
      message: 'User registered successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async login(username: string, password: string) {
    const user: User | null = await findUserByUsername(username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const match: boolean = await comparePassword(
      password,
      user.hash,
      user.salt,
    );

    if (!match) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      userId: user.userId,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        access_token: accessToken,
        userDto: userToUserDto(user),
      };
    } catch (error) {
      console.error('Error signing token:', error);
      throw new Error('Failed to sign token');
    }
  }

  async cookieLogin(userId: string) {
    const user: User | null = await User.findOne({
      where: { userId: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = {
      userId: user.userId,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        access_token: accessToken,
        userDto: userToUserDto(user),
      };
    } catch (error) {
      console.error('Error signing token:', error);
      throw new Error('Failed to sign token');
    }
  }
}
