import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { CollectionPoint } from "../model/collection-point.model";

@Injectable()
export class CollectionPointservice {

    collectionPointChanged = new Subject<CollectionPoint[]>();
    private collectionPoints: CollectionPoint[] = [];

    setCollectionPoints(collectionPoints: CollectionPoint[]) {
        this.collectionPoints = collectionPoints;
        this.collectionPointChanged.next(this.collectionPoints.slice());
    }

    addCollectionPoint(collectionPoint: CollectionPoint) {
        this.collectionPoints.push(collectionPoint);
        this.collectionPointChanged.next(this.collectionPoints.slice());
    }

    getCollectionPoints() {
        let data =  this.collectionPoints.slice();
        return data;
    }

}