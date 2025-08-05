import { container } from "tsyringe";
import { DomainEvent } from "../../domain/events/DomainEvent";
import { IndexResourceEvent } from "../../domain/events/IndexResourceEvent";
import { ElasticSearchService } from "@/contexts/CoreContext/application/services/ElasticSearchService";

const elasticSearchService = container.resolve(ElasticSearchService);

export const indexResourceHandler = (event: DomainEvent) => {
  const indexResEv = event as IndexResourceEvent;
  console.log(`indexing ${indexResEv.payload.resource} in eventHandler`);
  console.table(indexResEv.payload.resourceDto);
  elasticSearchService.indexResource(
    indexResEv.payload.resource,
    indexResEv.payload.resourceDto
  );
};
