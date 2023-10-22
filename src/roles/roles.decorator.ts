import { Role } from './role.enum';
import { Reflector } from '@nestjs/core';

export const ROLES_KEY = 'roles'
export const Roles = Reflector.createDecorator<Role>();