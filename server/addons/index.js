export class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

export class UnicityError extends Error {
    constructor(message) {
        super(message)
        this.name = "UnicityError"
    }
}