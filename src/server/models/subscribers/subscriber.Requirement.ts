import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Requirement } from '../model.Requirement';
import { Feature } from '../model.Feature';

/**
 * Will update the parent of entity.
 * @param entity Entity to update.
 */
const updateParent = (entity?: Requirement) => {
  if (entity) {
    Requirement.findOne({
      where: { _id: entity._id },
      relations: ['feature'],
    }).then((requirement) => {
      if (requirement) {
        Feature.update({ _id: requirement.feature._id }, {});
      }
    });
  }
};

@EventSubscriber()
export class RequirementSubscriber
  implements EntitySubscriberInterface<Requirement>
{
  listenTo() {
    return Requirement;
  }

  afterUpdate(event: UpdateEvent<Requirement>) {
    updateParent(event.entity as Requirement | undefined);
  }

  afterInsert(event: InsertEvent<Requirement>) {
    updateParent(event.entity as Requirement | undefined);
  }
}
