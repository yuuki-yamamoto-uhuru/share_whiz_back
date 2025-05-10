class ApiError extends Error {
    constructor(status = 500, message = 'Internal Server Error', details = []) {
        super(message);
        this.status = status;
        this.success = false;
        this.message = message;
        this.details = details;
    }

    toJson() {
        return {
            status: this.status,
            success: this.success,
            message: this.message,
            errors: this.details
        };
    }
}

module.exports = ApiError;