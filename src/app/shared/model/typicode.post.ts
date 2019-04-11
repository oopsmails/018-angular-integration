export class TypiCodePost {
    userId: string;
    id: string;
    title: string;
    body: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    static sortById = (post1: TypiCodePost, post2: TypiCodePost): number => {
        if (post1.id.toLowerCase() < post2.id.toLowerCase()) {
            return -1;
        }
        if (post1.id.toLowerCase() > post2.id.toLowerCase()) {
            return 1;
        }
        return 0;
    }
}
