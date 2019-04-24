import test from 'ava';
import sinon from 'sinon';

import { fetchJSON, getJSON, patchJSON, postJSON, putJSON, deleteJSON } from './fetch';

const DEFAULT_RESULT = {
    status: 200,
    headers: { 'content-type': 'application/json' },
    text: () => '{"id": 42, "email": "ozzy@example.com", "name": "Ozzy"}'
};

test.beforeEach(t => {
    // Create a mock global window object with a fake fetch method.
    // Pitfall: This omits ava's built-in isolated context and prevents us from running tests concurrently.
    // As a result, tests need to be run serially!
    global.window = {
        fetch: sinon.fake.resolves(DEFAULT_RESULT)
    };
});

test.afterEach.always(t => {
    // Remove the mock global window object after each test is run.
    delete global.window;
});

test.serial('Call `window.fetch` with given url, HTTP method, credentials, and body)', t => {
    fetchJSON('/some/url', 'GET', 'omit', '{ "foo": "bar" }');
    t.is(window.fetch.firstCall.args[0], '/some/url');
    t.is(window.fetch.firstCall.args[1].method, 'GET');
    t.is(window.fetch.firstCall.args[1].body, '{ "foo": "bar" }');
    t.is(window.fetch.firstCall.args[1].credentials, 'omit');
});

test.serial('Pass response JSON through a callback upon successfull request', async t => {
    const callback = sinon.spy();
    await fetchJSON('/some/url', 'GET', 'omit', '{ "foo": "bar" }', callback);
    t.true(callback.calledWith({ id: 42, name: 'Ozzy', email: 'ozzy@example.com' }));
});

test.serial('Return a promise that resolves upon successfull request', t => {
    const request = fetchJSON('/some/url', 'GET', 'omit', '{ "foo": "bar" }');
    return request.then(result => {
        t.deepEqual(result, { id: 42, name: 'Ozzy', email: 'ozzy@example.com' });
    });
});

test.serial('Call `window.fetch` with `PATCH` and the given request body', t => {
    patchJSON('/some/url', '{ "foo": "bar" }');
    t.is(window.fetch.firstCall.args[0], '/some/url');
    t.is(window.fetch.firstCall.args[1].method, 'PATCH');
    t.is(window.fetch.firstCall.args[1].body, '{ "foo": "bar" }');
});

test.serial('Call `window.fetch` with `POST` and the given request body', t => {
    postJSON('/some/url', '{ "foo": "bar" }');
    t.is(window.fetch.firstCall.args[0], '/some/url');
    t.is(window.fetch.firstCall.args[1].method, 'POST');
    t.is(window.fetch.firstCall.args[1].body, '{ "foo": "bar" }');
});

test.serial('Call `window.fetch` with `PUT` and the given request body', t => {
    putJSON('/some/url', '{ "foo": "bar" }');
    t.is(window.fetch.firstCall.args[0], '/some/url');
    t.is(window.fetch.firstCall.args[1].method, 'PUT');
    t.is(window.fetch.firstCall.args[1].body, '{ "foo": "bar" }');
});

test.serial('Call `window.fetch` with `GET`', t => {
    getJSON('/some/url');
    t.is(window.fetch.firstCall.args[0], '/some/url');
    t.is(window.fetch.firstCall.args[1].method, 'GET');
});

test.serial('Call `window.fetch` with `DELETE`', t => {
    deleteJSON('/some/url');
    t.is(window.fetch.firstCall.args[0], '/some/url');
    t.is(window.fetch.firstCall.args[1].method, 'DELETE');
});
