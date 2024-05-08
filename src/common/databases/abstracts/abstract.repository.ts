/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepPartial, InsertResult, ObjectLiteral, Repository } from 'typeorm';

export interface IRepository<Entity extends ObjectLiteral> {
  findById(id: number): Promise<Entity | null>;

  findMany(): Promise<Array<Entity>>;

  create(doc: DeepPartial<Entity>): Promise<Entity | null>;

  // updateById(id: number, doc: DeepPartial<Entity>): Promise<any | null>;

  // updateById(id: number, doc: DeepPartial<Entity>): Promise<any | null>;

  deleteById(id: number): Promise<any | null>;
}

export class AbstractRepository<Entity extends ObjectLiteral>
  implements IRepository<Entity>
{
  protected readonly _repository: Repository<Entity>;
  constructor(baseRepository: Repository<Entity>) {
    this._repository = baseRepository;
  }

  async existedField(data: any): Promise<boolean> {
    if (await this._repository.existsBy(data)) {
      return true;
    }
    return false;
  }
  async findById(id: any): Promise<Entity | null> {
    return await this._repository.findOne({ where: { id } });
  }
  async findOne(field: Record<string, any>): Promise<Entity | null> {
    return await this._repository.findOne({ where: field });
  }
  async findMany(selects?: string[], where?: any): Promise<Entity[]> {
    return await this._repository.find({ select: selects, where });
  }

  async create(doc: DeepPartial<Entity>): Promise<Entity> {
    return await this._repository.create(doc).save();
  }

  async save(docs: any): Promise<Entity> {
    return await this._repository.save(docs);
  }

  async insertAll(doc: DeepPartial<Entity>[]): Promise<InsertResult> {
    const entity = doc.map((item) => this._repository.create(item));
    return await this._repository.insert(entity);
  }

  async deleteById(id: number): Promise<any> {
    const foundInstance = await this.findById(id);
    await this._repository.remove(foundInstance);
    return {
      message: `Instance with id ${id} has been deleted`,
    };
  }
}
