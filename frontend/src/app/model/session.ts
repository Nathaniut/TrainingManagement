export class Session {
    constructor (
        public id: number,
        public begin: string,
        public end: string,
        public price: number,
        public TrainingId: number
    ) {}
}
