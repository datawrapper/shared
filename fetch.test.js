import test from 'ava';
import sinon from 'sinon';

import { patchJSON } from './fetch';

test.beforeEach(t => {
    global.window = {
        fetch: sinon.fake.resolves({
            status: 200,
            headers: { 'content-type': 'application/json' },
            text: () => '{"id": 42, "email": "ozzy@example.com", "name": "Ozzy"}'
        })
    };
});

test('Call `window.fetch` with `PATCH` and the given request body', t => {
    patchJSON('/some/url', '{ foo: "bar" }');
    t.is(window.fetch.getCall(0).args[0], '/some/url');
    t.is(window.fetch.getCall(0).args[1].method, 'PATCH');
    t.is(window.fetch.getCall(0).args[1].body, '{ foo: "bar" }');
});
