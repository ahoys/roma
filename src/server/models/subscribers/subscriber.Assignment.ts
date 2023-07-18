import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Assignment } from '../model.Assignment';
import { Feature } from '../model.Feature';

/**
 * Will update the parent of entity.
 * @param entity Entity to update.
 */
const updateParent = (entity?: Assignment) => {
  if (entity) {
    Assignment.findOne({
      where: { _id: entity._id },
      relations: ['feature'],
    }).then((assignment) => {
      if (assignment) {
        Feature.update({ _id: assignment.feature._id }, {});
      }
    });
  }
};

@EventSubscriber()
export class AssignmentSubscriber
  implements EntitySubscriberInterface<Assignment>
{
  listenTo() {
    return Assignment;
  }

  afterUpdate(event: UpdateEvent<Assignment>) {
    updateParent(event.entity as Assignment | undefined);
  }

  afterInsert(event: InsertEvent<Assignment>) {
    updateParent(event.entity as Assignment | undefined);
  }
}
