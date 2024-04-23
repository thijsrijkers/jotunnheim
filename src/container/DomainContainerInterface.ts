import { Domain } from "../domain/Domain";

export interface DomainContainerInterface {
    domains: Domain[];
    host:string;
    redirect:string;

    registerDomain(domain: Domain): void;
    launch(): void;
}