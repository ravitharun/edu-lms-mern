const { default: axios } = require("axios");

const ApiMonitioring = (req, res, next) => {
    const start = Date.now();

    const checkhealth = (code) => {
        if (code >= 200 && code < 300) return "SUCCESS";
        if (code >= 300 && code < 400) return "REDIRECT";
        if (code >= 400 && code < 500) return "CLIENT_ERROR";
        if (code >= 500) return "SERVER_ERROR";
        return "DOWN";
    };

    const GetresponseTimeStatus = (time) => {
        if (time < 200) return "FAST";
        if (time < 500) return "MODERATE";
        return "SLOW";
    };

    const getHealthScore = (responseTime, statusCode) => {
        if (statusCode >= 500) return 0;
        if (statusCode >= 400) return 25;

        if (statusCode >= 200 && statusCode < 300) {
            if (responseTime < 200) return 100;
            if (responseTime < 500) return 75;
            return 50;
        }

        if (statusCode >= 300 && statusCode < 400) return 60;

        return 0;
    };

    const getstatus = (code) => {
        if (code >= 200 && code < 300) {
            return "SUCCESS";
        }
        else if (code >= 300 && code < 400) {
            return "SUCCESS"; // redirect / cached
        }
        else if (code >= 400 && code < 500) {
            console.log("hey");

            return "FAILURE";
        }
        else {
            return "FAILURE"; // 500+
        }
    };
    res.on("finish", async () => {
        const responseTime = Date.now() - start;

        const Apilogs = {
            originalUrl: req.originalUrl,
            method: req.method,
            statusCode: res.statusCode,
            responseTime,
            responseTimeStatus: GetresponseTimeStatus(responseTime),
            apihealth: checkhealth(res.statusCode),
            healthscore: getHealthScore(responseTime, res.statusCode),
            timestamp: new Date(),
            status: getstatus(res.statusCode)
        };

        console.log(Apilogs, 'Apilogs');

        const url = process.env.NODE_ENV == 'development' ? process.env.APILOCALHOST_MONITORING : process.env.APIMONITORING_URL
        await axios.post(`${url}/AppExp/check`, Apilogs)
            .catch(err => console.log("Monitoring error:", err));
    });
    next();

};

module.exports = ApiMonitioring;