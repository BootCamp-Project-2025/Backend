import { container } from "tsyringe";
import { DomainEvent } from "../../domain/events/DomainEvent";
import { ElasticSearchService } from "@/contexts/CoreContext/application/services/ElasticSearchService";
import { DeleteResourceEvent } from "../../domain/events/DeleteResourceEvent";

const elasticSearchService = container.resolve(ElasticSearchService);

export const deleteResourceHandler = (event: DomainEvent) => {
  const deleteResEv = event as DeleteResourceEvent;
  console.log(`deleting ${deleteResEv.payload.resource} in eventHandler`);
  console.table(deleteResEv.payload.resourceId);
  elasticSearchService.removeResource(
    deleteResEv.payload.resource,
    deleteResEv.payload.resourceId
  );
};
