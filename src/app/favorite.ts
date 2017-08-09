export class Favorite {
    id: number;
    title: string;
    url: string;
    tags: string;
    read: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
