/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findRoleByName(data: Record<string, any>) {
    return this.roleRepository.findOne(data);
  }
}
