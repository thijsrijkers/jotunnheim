import { Domain } from "../types/Domain";

export interface DomainInterface {
    domain: Domain;
    launchEndpoint(): void;
    healthCheck(): Promise<boolean>;
}