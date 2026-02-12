import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message:{ success:true, message: "Too many requests from this IP, please try again after 1 minute" },
    standardHeaders:true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, // Disable the `X-RateLimit-*` headers
});

export default apiLimiter;