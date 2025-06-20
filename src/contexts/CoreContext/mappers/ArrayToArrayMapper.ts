export abstract class ArrayToArrayMapper<Domain, Persistance> {
  abstract mapPersistanceToDomain(origin: Persistance): Domain;

  abstract mapDomainToPersistance(origin: Domain): Persistance;

  mapArrayPersistanceToDomain(items: Persistance[]): Domain[] {
    return items.map((item) => this.mapPersistanceToDomain(item));
  }

  mapArrayDomainToPersistance(items: Domain[]): Persistance[] {
    return items.map((item) => this.mapDomainToPersistance(item));
  }
}
