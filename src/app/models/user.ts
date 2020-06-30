export class User {
    constructor(
        public physicalCondition: string,
        public age: number,
        public gender: string,
        public closeContact: boolean,
        public symptoms: string[],
    ) {}
}