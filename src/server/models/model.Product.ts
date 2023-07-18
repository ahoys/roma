import { Column, Entity, ManyToOne } from 'typeorm';
import { Model, defaultNameColumn } from './model';
import { Roadmap } from './model.Roadmap';
import { ProductDTO } from '../../shared/dtos/dto.ProductDTO';

@Entity()
export class Product extends Model implements ProductDTO {
  @Column(defaultNameColumn)
  name: string;

  @ManyToOne(() => Roadmap, (model) => model.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  roadmap: Roadmap;

  /**
   * Will create a new entity and save it to the database.
   * @param partial Building blocks for the new entity.
   * @returns The new entity.
   */
  static async handleCreate(partial: Partial<ProductDTO>): Promise<Product> {
    const model = new Product();
    return await Product.handleUpdate(model, partial);
  }

  /**
   * Will update an existing entity and save it to the database.
   * @param model The entity to update.
   * @param partial The new values for the entity.
   * @returns The updated entity.
   */
  static async handleUpdate(
    model: Product,
    partial: Partial<ProductDTO>
  ): Promise<Product> {
    if (typeof partial.name === 'string') {
      model.name = partial.name;
    }
    if (typeof partial.roadmapId === 'number') {
      model.roadmap = (await Roadmap.findOneBy({
        _id: partial.roadmapId,
      })) as Roadmap;
    }
    return await model.save();
  }
}
