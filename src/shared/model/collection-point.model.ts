export class CollectionPoint {

    public id: string;
    public collector: string;
    public contactDetails: CntactDetail[];
    public address: string;
    public city: string;
    public province: string;
    public publiccollectableMaterials: CollectableMaterials[];
    public latitude: number;
    public longitude: number;
    public imgPath: string;
}

export class CntactDetail {
    public contact: string;
}

export class CollectableMaterials {
    public collectable_material: string;
}