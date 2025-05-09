class ApiSuccess {
    constructor(status = 200, message = 'Success', data = null) {
        this.status = status;
        this.success = true;
        this.message = message;
        this.data = data;
    }

    toJSON() {
        return {
            status: this.status,
            success: this.success,
            message: this.message,
            data: this.data
        };
    }
}

module.exports = ApiSuccess;