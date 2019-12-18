import test from 'ava';
import fetch from 'node-fetch';
import httpReq from './httpReq';

const baseUrl = 'https://httpbin.org';

test.before(t => {
    window.fetch = fetch;
    global.dw = { backend: { __api_domain: 'api.datawrapper.local' } };
});

test('simple get request', async t => {
    let res = await httpReq('GET', '/get', { baseUrl });
    t.is(res.url, `${baseUrl}/get`);
    // alternative syntax
    res = await httpReq('/get', { baseUrl });
    t.is(res.url, `${baseUrl}/get`);
});

test('simple put request', async t => {
    let res = await httpReq('PUT', '/put', { baseUrl });
    t.is(res.url, `${baseUrl}/put`);
    t.is(res.headers['Content-Type'], `application/json`);
    // alternative syntax
    res = await httpReq('/put', { method: 'PUT', baseUrl });
    t.is(res.url, `${baseUrl}/put`);
});

test('simple put request with json payload', async t => {
    const payload = { answer: 42 };
    let res = await httpReq('PUT', '/put', { baseUrl, payload });
    t.deepEqual(res.json, payload);
    t.is(res.headers['Content-Type'], `application/json`);
    // alternative syntax
    res = await httpReq('/put', { method: 'PUT', baseUrl, payload });
    t.deepEqual(res.json, payload);
});

test('post request with csv body', async t => {
    const body = 'foo, bar\n1, 2';
    // default content-type is application/json
    let res = await httpReq('PUT', '/put', {
        baseUrl,
        body,
        headers: { 'Content-Type': 'text/csv' }
    });
    t.is(res.headers['Content-Type'], `text/csv`);
    t.is(res.data, body);
    t.falsy(res.json);
    // alternative syntax
    res = await httpReq('/put', {
        method: 'PUT',
        baseUrl,
        body,
        headers: { 'Content-Type': 'text/csv' }
    });
    t.is(res.headers['Content-Type'], `text/csv`);
    t.is(res.data, body);
    t.falsy(res.json);
});
