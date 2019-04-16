const Joi = require('joi');
const chalk = require('chalk');

const schema = {};

schema.API = Joi.object({
    port: Joi.number()
        .integer()
        .default(3000),
    domain: Joi.string()
        .hostname()
        .required(),
    subdomain: Joi.string(),
    sessionID: Joi.string().default('DW-SESSION'),
    https: Joi.boolean(),
    cors: Joi.array().required(),
    hashRounds: Joi.number()
        .integer()
        .default(15),
    enableMigration: Joi.boolean(),
    authSalt: Joi.string(),
    secretAuthSalt: Joi.string()
}).unknown();

schema.Frontend = Joi.object()
    .keys({
        domain: Joi.string()
            .hostname()
            .required(),
        https: Joi.boolean(),
        img_domain: Joi.string(),
        img_cloudflare: Joi.boolean()
    })
    .unknown();

schema.ORM = Joi.object()
    .keys({
        retry: Joi.boolean().optional(),
        db: Joi.object()
            .keys({
                dialect: Joi.string()
                    .required()
                    .default('mysql'),
                host: Joi.string()
                    .hostname()
                    .required(),
                port: Joi.number()
                    .integer()
                    .default(3306),
                user: Joi.string().required(),
                password: Joi.string().required(),
                database: Joi.string().required()
            })
            .required()
    })
    .unknown();

schema.RenderServer = Joi.object({
    domain: Joi.string().required(),
    host: Joi.string()
        .ip()
        .required(),
    port: Joi.number()
        .integer()
        .required(),
    tls: Joi.object({
        cert: Joi.string(),
        key: Joi.string(),
        ca: Joi.string()
    }).optional(),
    ec2: Joi.object({
        region: Joi.string().required(),
        access_key_id: Joi.string().required(),
        secret_access_key: Joi.string().required()
    }).required()
}).unknown();

schema.RenderClient = Joi.object({
    max_jobs_before_restart: Joi.number()
        .integer()
        .required(),
    tls: Joi.object({
        cert: Joi.string(),
        key: Joi.string(),
        ca: Joi.string()
    }),
    s3: Joi.object({
        access_key_id: Joi.string().required(),
        secret_access_key: Joi.string().required()
    }).required(),
    cloudflare: Joi.object({
        zone_id: Joi.string(),
        auth_email: Joi.string().email(),
        auth_key: Joi.string()
    }),
    cloudfront: Joi.object({
        distribution_id: Joi.string(),
        access_key_id: Joi.string(),
        secret_access_key: Joi.string()
    })
}).unknown();

function validate(name, config) {
    const { error, value } = Joi.validate(config, schema[name], { abortEarly: false });

    if (error) {
        process.stderr.write(chalk.red(`\n[${name}] config validation failed\n`));
        error.details.forEach(err => {
            process.stderr.write(
                `    [${err.path.join('.')}] ${err.message} | value: ${err.context.value}\n`
            );
        });
        process.exit(1);
    }

    return value;
}

const validateFunctions = {};

Object.keys(schema).forEach(key => {
    validateFunctions[`validate${key}`] = config => validate(key, config);
});

module.exports = validateFunctions;
