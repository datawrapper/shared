import test from 'ava';
import configSchema from './configSchema';

const config = {
    frontend: {
        https: false,
        domain: 'example.de',
        img_domain: 'img.example.de',
        img_cloudflare: false
    },
    api: {
        port: 3000,
        domain: 'example.de',
        subdomain: 'api',
        sessionID: 'session',
        https: false,
        hashRounds: 15,
        enableMigration: true,
        cors: ['*'],
        authSalt: 'token',
        secretAuthSalt: 'token'
    },
    orm: {
        retry: true,
        db: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            user: 'user',
            password: 'password',
            database: 'database'
        }
    },
    'render-server': {
        domain: 'render.example.de',
        host: '0.0.0.0',
        port: 999
    },
    'render-client': {
        max_jobs_before_restart: 3,
        s3: {
            access_key_id: 'token',
            secret_access_key: 'token'
        },
        cloudflare: {
            zone_id: 'id',
            auth_email: 'test@example.de',
            auth_key: 'token'
        },
        cloudfront: {
            distribution_id: 'id',
            access_key_id: 'token',
            secret_access_key: 'token'
        }
    }
};

test('validateConfig - should successfully validate', t => {
    t.notThrows(() => configSchema.validateConfig(config));
});

test('validateConfig - should throw with invalid config', t => {
    let invalidConfig = { ...config };
    invalidConfig.plugins = '';
    t.throws(() => configSchema.validateConfig(invalidConfig));
});

test('validateConfig - should throw with wrong top level keys', t => {
    let invalidConfig = { ...config };
    invalidConfig.API = '';
    const error = t.throws(() => configSchema.validateConfig(invalidConfig));

    t.is(error.name, 'ValidationError');
    t.deepEqual(error.details[0].path, ['API']);
    t.is(error.details[0].type, 'object.allowUnknown');
});

test('validateFrontend - should successfully validate', t => {
    t.notThrows(() => configSchema.validateFrontend(config.frontend));
});

test('validateFrontend - should throw with invalid config', t => {
    t.throws(() => configSchema.validateFrontend({}));
});

test('validateAPI - should successfully validate', t => {
    t.notThrows(() => configSchema.validateAPI(config.api));
});

test('validateAPI - should throw with invalid config', t => {
    t.throws(() => configSchema.validateAPI({}));
});

test('validateORM - should successfully validate', t => {
    t.notThrows(() => configSchema.validateORM(config.orm));
});

test('validateORM - should throw with invalid config', t => {
    t.throws(() => configSchema.validateORM({}));
});

test('validateRenderServer - should successfully validate', t => {
    t.notThrows(() => configSchema.validateRenderServer(config['render-server']));
});

test('validateRenderServer - should throw with invalid config', t => {
    t.throws(() => configSchema.validateRenderServer({}));
});

test('validateRenderClient - should successfully validate', t => {
    t.notThrows(() => configSchema.validateRenderClient(config['render-client']));
});

test('validateRenderClient - should throw with invalid config', t => {
    t.throws(() => configSchema.validateRenderClient({}));
});
