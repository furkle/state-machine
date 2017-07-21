const Transitionable = require('../').Transitionable;

describe('Transitionable tests.', () => {
    it('Does not break if configObj is falsey.', () => {
        expect(() => new Transitionable()).not.toThrow();
        expect(() => new Transitionable(null)).not.toThrow();
    });

    it('Passes along attributes included in config object.', () => {
        const attributes = {
            foo: 'bar',
            baz: 'bux',
        };

        const transitionable = new Transitionable({
            attributes,
        });

        expect(transitionable.attributes).toBe(attributes);
    });

    it('Creates an empty attributes object if configObj.attributes is out of band.', () => {
        const attributes = null;

        const transitionable = new Transitionable({
            attributes,
        });

        expect(transitionable.attributes).toEqual({});
    });

    it('Passes along the predicate function included in config object.', () => {
        const predicate = () => {};

        const transitionable = new Transitionable({
            predicate,
        });

        expect(transitionable.predicate).toBe(predicate);
    });

    it('Adds no predicate function if predicate in config object is out of band.', () => {
        const predicate = null;

        const transitionable = new Transitionable({
            predicate,
        });

        expect('predicate' in transitionable).toBe(false);
    });

    it('Strips data- off with getTransformedAttributeName.', () => {
        const transitionable = new Transitionable();
        const str = 'data-foo';
        expect(transitionable.getTransformedAttributeName(str)).toBe('foo');
    });

    it('Strips data off with getTransformedAttributeName.', () => {
        const transitionable = new Transitionable();
        const str = 'datafoo';
        expect(transitionable.getTransformedAttributeName(str)).toBe('foo');
    });

    it('Does not touch the string "data" with getTransformedAttributeName.', () => {
        const transitionable = new Transitionable();
        const str = 'data';
        expect(transitionable.getTransformedAttributeName(str)).toBe('data');
    });

    it('Camel-cases names with getTransformedAttributeName.', () => {
        const transitionable = new Transitionable();
        const str = 'foo-bar-baz-bux';
        expect(transitionable.getTransformedAttributeName(str))
            .toBe('fooBarBazBux');
    });

    it('Handles runs of dashes with getTransformedAttributeName.', () => {
        const transitionable = new Transitionable();
        const str = 'data--foo---bar----baz-bux';
        expect(transitionable.getTransformedAttributeName(str))
            .toBe('fooBarBazBux');
    });

    it('Checks for the existence of attributes, calling getTransformedAttributeName, with removeAttribute.', () => {
        const transitionable = new Transitionable({
            attributes: { foo: 'bar', },
        });

        transitionable.getTransformedAttributeName = jest.fn(() => 'foo');
        const result = transitionable.hasAttribute('_test');
        
        expect(transitionable.getTransformedAttributeName.mock.calls.length)
            .toBe(1);
        expect(transitionable.getTransformedAttributeName)
            .lastCalledWith('_test');
        expect(result).toBe(true);
    });

    it('Gets attributes, calling getTransformedAttributeName, with getAttribute.', () => {
        const transitionable = new Transitionable({
            attributes: { foo: 'bar', },
        });

        transitionable.getTransformedAttributeName = jest.fn(() => 'foo');
        const result = transitionable.getAttribute('_test');

        expect(transitionable.getTransformedAttributeName.mock.calls.length)
            .toBe(1);
        expect(transitionable.getTransformedAttributeName)
            .lastCalledWith('_test');
        expect(result).toBe('bar');
    });

    it('Sets attributes, calling getTransformedAttributeName, with setAttribute.', () => {
        const transitionable = new Transitionable();
        transitionable.getTransformedAttributeName = jest.fn(() => 'foo');
        transitionable.setAttribute('_test', 'bar');
        
        expect(transitionable.getTransformedAttributeName.mock.calls.length)
            .toBe(1);
        expect(transitionable.getTransformedAttributeName)
            .lastCalledWith('_test');
        expect(transitionable.attributes.foo).toBe('bar');
    });

    it('Removes attributes, calling getTransformedAttributeName, with removeAttribute.', () => {
        const transitionable = new Transitionable({
            attributes: { foo: 'bar', },
        });
        transitionable.getTransformedAttributeName = jest.fn(() => 'foo');
        transitionable.removeAttribute('_test');
        
        expect(transitionable.getTransformedAttributeName.mock.calls.length)
            .toBe(1);
        expect(transitionable.getTransformedAttributeName)
            .lastCalledWith('_test');
        expect('foo' in transitionable.attributes).toBe(false);
    });
});