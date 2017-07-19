export class Favorite {
    title: string;
    link: string;
    date?: string;
    category?: string;
    description?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
