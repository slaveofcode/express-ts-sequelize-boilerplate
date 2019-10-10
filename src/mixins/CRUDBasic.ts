import PageNotFoundException from '@exceptions/PageNotFound';
import { Model } from 'sequelize';

export default class {
  protected entityName: string;
  protected crudClass: any;

  protected async list(): Promise<any[]> {
    try {
      const results = await this.crudClass.findAll({ raw: true });
      return results;
    } catch {
      return [];
    }
  }

  protected async get(id: number): Promise<any> {
    try {
      const item = await this.crudClass.findOne({
        where: { id },
        raw: true,
      });
      return item;
    } catch {
      return null;
    }
  }

  protected async update(id: number, updateParams: any)
    : Promise<[boolean, any] | PageNotFoundException> {
    try {
      const item = await this.crudClass.findOne({
        where: { id },
        raw: true,
      });

      if (!item) {
        return new PageNotFoundException(`${this.entityName} not found`);
      }

      const [affectedRowsNum, updatedItem] = await this.crudClass.update(updateParams, {
        where: { id },
        returning: true,
      });

      const isUpdated = affectedRowsNum > 0;

      return [isUpdated, isUpdated ? updatedItem[0] : null];
    } catch {
      return [false, null];
    }
  }

  protected async create<M extends Model>(createParams: any): Promise<M | boolean> {
    try {
      const newObj = await this.crudClass.create(createParams, { raw: true });
      return newObj.toJSON();
    } catch {
      return false;
    }
  }

  protected async delete(id: number): Promise<boolean> {
    try {
      const destroyedNum = await this.crudClass.destroy({
        where: { id },
      });
      return destroyedNum > 0;
    } catch {
      return false;
    }
  }
}
