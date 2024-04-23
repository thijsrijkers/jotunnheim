import { Domain as DomainType } from "../types/Domain";
import { DomainInterface } from "./DomainInterface";
import { express, Response } from 'express';
import * as http from 'http';

export class Domain implements DomainInterface {
    domain: DomainType;
    app;
    listing: string;

    constructor(domain: DomainType) {
        this.domain = domain;
        this.app = express();
        this.listing = "http://localhost";
    }

    public launchEndpoint(): void {
        if(!this.domain.newHost){
            console.error(`Port: ${this.domain.port} couldnt be launched of given host`);
            return;
        }
        
        this.app.get(`/${this.domain.endpoint}`, (res: Response) => {
            try {
                res.redirect(`${this.domain.newHost}/${this.domain.endpoint}`);
            } catch (error) {
                res.status(500).json({ message: error });
            }
        });

        this.listing = `${this.domain.newHost}/${this.domain.endpoint}`;

        this.app.listen(this.domain.port, () => {
            console.log(`Server is running on http://localhost:${this.domain.port}`);
        });
    }

    public async healthCheck(): Promise<boolean> {
        return await new Promise((resolve) => {
            http.get(this.listing, (res: any) => {
                resolve(res?.statusCode === 200);
            }).on('error', () => {
                resolve(false);
            });
        });
    }

}