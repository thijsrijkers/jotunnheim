import { Domain } from "../domain/Domain";
import { DomainContainerInterface } from "./DomainContainerInterface";

export class DomainContainer implements DomainContainerInterface {

    host: string;
    redirect: string;
    domains: Domain[];

    constructor(host:string, redirect:string) {
        this.domains = [];
        this.host = host;
        this.redirect = redirect;
    }

    registerDomain(object: Domain): void {
        object.domain.newHost = this.host;
        object.domain.oldHost = this.redirect;

        this.domains.push(object);
        console.log(`Domain ${this.host} has been registered`);
    }

    launch(): void {
        try{
            this.domains.forEach(domain => {
                domain.launchEndpoint();
            });
        } catch(error){

        }
    }

 

}