import { buildUri } from '@ui/utils/helpers';

describe('buildUri', () => {
    it('works with empty base', () => {
        const uri = buildUri('');
        expect(uri).toEqual('');
    });

    it('works with base only', () => {
        const uri = buildUri('index.php');
        expect(uri).toEqual('index.php');
    });

    it('works with protocol', () => {
        const uri = buildUri('test.com', { protocol: 'https' });
        expect(uri).toEqual('https://test.com');
    });

    it('works with mail and tel protocol', () => {
        let uri = buildUri('test@test.com', { protocol: 'mailto' });
        expect(uri).toEqual('mailto:test@test.com');

        uri = buildUri('84222333111', { protocol: 'tel' });
        expect(uri).toEqual('tel:84222333111');
    });

    it('appends query', () => {
        const uri = buildUri('index.php', {
            query: {
                cse: 30,
                cmo: 101,
                stxaction: 'test',
                empty: '',
                nulled: null,
            },
        });
        expect(uri).toEqual('index.php?cse=30&cmo=101&stxaction=test&empty=&nulled=');
    });

    it('appends query when already exists', () => {
        const uri = buildUri('index.php?t=1', {
            query: {
                cse: 30,
                cmo: 101,
                stxaction: 'test',
            },
        });
        expect(uri).toEqual('index.php?t=1&cse=30&cmo=101&stxaction=test');
    });

    it('appends hash', () => {
        const uri = buildUri('index.php', {
            query: {
                cse: 0,
                cmo: 0,
                stxaction: 'test',
            },
            hash: '/path/to/resource',
        });
        expect(uri).toEqual('index.php?cse=0&cmo=0&stxaction=test#/path/to/resource');
    });

    it('appends hash when already exists', () => {
        const uri = buildUri('index.php?t=1#/root', {
            hash: '/path/to/resource',
        });
        expect(uri).toEqual('index.php?t=1#/root/path/to/resource');
    });

    it('appends script', () => {
        let uri = buildUri('www.test.com/', {
            script: 'script1',
        });
        expect(uri).toEqual('www.test.com/script1');
        uri = buildUri('www.test.com', {
            script: 'script1',
            hash: 'foobar',
        });
        expect(uri).toEqual('www.test.com/script1#foobar');
    });
});
