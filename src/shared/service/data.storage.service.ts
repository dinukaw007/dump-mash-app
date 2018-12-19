import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CollectionPointservice } from "./collection-points.service";
import { CollectionPoint } from "../model/collection-point.model";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient,private collectionPointservice : CollectionPointservice) { }

    private firebaseBaseUrl : string = 'https://dumpmash-dbstore.firebaseio.com/';
    getCollectionPoints() {      
        return this.http.get(this.firebaseBaseUrl + 'collection.json')
            .pipe(map(
                (collectionPointResponse: CollectionPoint[]) => {
                    const collectionPoints: CollectionPoint[] = collectionPointResponse;
                    if (collectionPoints !== null) {
                        for (let collectionPoint of collectionPoints) {
                            if (!collectionPoint['contactDetails']) {
                                collectionPoint['contactDetails'] = [];
                            }
                            if (!collectionPoint['collectableMaterials']) {
                                collectionPoint['collectableMaterials'] = [];
                            }
                        }
                    } else {
                        console.log("Something went wrong");
                    }
                    return collectionPoints;
                }
            ))
            .subscribe(
                (collectionPoints: CollectionPoint[]) => {
                    if (collectionPoints !== null) {
                        this.collectionPointservice.setCollectionPoints(collectionPoints);
                    } else {
                        console.log("Something went wrong");
                    }
    
                }
            );
    }
}
