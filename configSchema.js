const Joi = require('@hapi/joi');
const chalk = require('chalk');

const schema = {};

schema.API = Joi.object({
    port: Joi.number()
        .port()
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
    secretAuthSalt: Joi.string(),
    localPluginRoot: Joi.string()
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
                    .port()
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
        .port()
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
    })
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

schema.Crons = Joi.object({
    screenshots: Joi.object({
        s3: [
            Joi.object({
                bucket: Joi.string(),
                path: Joi.string()
            }),
            Joi.boolean().valid(false)
        ]
    })
});

const schemaAll = {
    frontend: schema.Frontend,
    api: schema.API,
    orm: schema.ORM,
    crons: schema.Crons,
    'render-server': schema.RenderServer,
    'render-client': schema.RenderClient,
    plugins: Joi.object()
};

function validate(name, config) {
    const { error, value } = Joi.validate(config, name ? schema[name] : schemaAll, {
        abortEarly: false
    });

    if (error) {
        process.stderr.write(chalk.red(`\n[${name || 'All'}] config validation failed\n`));
        error.details.forEach(err => {
            process.stderr.write(
                `    [${err.path.join('.')}] ${err.message} | value: ${err.context.value}\n`
            );
        });
        throw error;
    }

    return value;
}

/**
 * `@datawrapper/shared/configSchema` provides a set of useful validation functions for service
 * config validation.
 *
 * > This object is not included with `import shared from "@datawrapper/shared"`.
 * > It has a dependency on `Joi` which is quite a big validation library for Node server projects.
 *
 * Each function returns the configuration object when validation succeeds.
 * When validation fails (eg. missing or invalid key) a function will throw a `ValidationError`.
 *
 * Example function signature: `function validateAPI (config : object) : object`
 *
 * @namespace
 * @property {function} validateAPI - Validate an API server config
 * @property {function} validateORM - Validate an ORM initialization config
 * @property {function} validateFrontend - Validate a frontend server config
 * @property {function} validateRenderServer - Validate a render server config
 * @property {function} validateRenderClient - Validate a render client config
 * @property {function} validateAll - Validate a complete config
 *
 * @example
 * // validate complete config
 * const { validateAll } = require('@datawrapper/shared/configSchema')
 * validateAll(config)
 *
 * // validate only api config
 * const { validateAPI } = require('@datawrapper/shared/configSchema')
 * validateAPI(config.api)
 *
 * // if a service relies on multiple configuration objects but not all. Validate the parts needed.
 * const { validateAPI, validateORM } = require('@datawrapper/shared/configSchema')
 * validateAPI(config.api)
 * validateORM(config.orm)
 */
const configSchema = {
    validateConfig: config => {
        return validate(undefined, config);
    }
};

Object.keys(schema).forEach(key => {
    configSchema[`validate${key}`] = config => validate(key, config);
});

module.exports = configSchema;
