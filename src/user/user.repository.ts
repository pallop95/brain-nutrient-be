import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(userData: User): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  // async updateUser(
  //   id: string,
  //   userData: Partial<User>,
  // ): Promise<User | undefined> {
  //   await this.update(id, userData);
  //   return this.findOneById(id);
  // }

  // async deleteUser(id: string): Promise<void> {
  //   await this.delete(id);
  // }

  // async findUserById(id: string): Promise<User | undefined> {
  //   return this.findOneById(id);
  // }

  // async findAllUsers(): Promise<User[]> {
  //   return this.find();
  // }
}
