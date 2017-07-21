const TransitionSupervisor = require('../').Supervisor;

describe('collectTransitionables unit tests', () => {
    it('Returns an empty array when the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;

        expect(supervisor.collectTransitionables()).toEqual([]);
        expect(console.log).not.toBeCalled();

        console.log = log;
    });

    it('Logs objectToSuperviseInvalid and returns an empty array when objectToSupervise is invalid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.objectToSupervise = null;

        const str = supervisor.strings.objectToSuperviseInvalid;
        expect(supervisor.collectTransitionables()).toEqual([]);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder and returns an empty array when objectToSupervise is invalid and objectToSuperviseInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        delete supervisor.objectToSupervise;
        delete supervisor.strings.objectToSuperviseInvalid;

        const str = 'Error missing! objectToSuperviseInvalid';
        expect(supervisor.collectTransitionables()).toEqual([]);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Queries for the selector in the objectToSupervise when it has querySelectorAll and returns a real array.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
            config: { selector: 'foobar', },
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.objectToSupervise = {
            querySelectorAll: jest.fn(() => (
                {
                    0: 'foo',
                    1: 'bar',
                    2: 'baz',
                    length: 3,
                }
            )),
        };

        expect(supervisor.collectTransitionables()).toEqual([
            'foo', 'bar', 'baz',
        ]);
        expect(supervisor.objectToSupervise.querySelectorAll.mock.calls.length)
            .toBe(1);
        expect(supervisor.objectToSupervise.querySelectorAll)
            .lastCalledWith('foobar');
        expect(console.log).not.toBeCalled();

        console.log = log;
    });

    it('Creates a real array from an array-like object.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.objectToSupervise = {
            0: 'foo',
            1: 'bar',
            2: 'baz',
            length: 3,
        };

        expect(supervisor.collectTransitionables()).toEqual([
            'foo', 'bar', 'baz',
        ]);
        expect(console.log).not.toBeCalled();

        console.log = log;
    });

    it('Passes through real arrays.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.objectToSupervise = [
            'foo',
            'bar',
            'baz',
        ];

        expect(supervisor.collectTransitionables()).toEqual([
            'foo', 'bar', 'baz',
        ]);
        expect(console.log).not.toBeCalled();

        console.log = log;
    });

    it('Logs objectToSuperviseInvalid and returns an empty array if none of the above conditions are true.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.objectToSupervise = {};

        const str = supervisor.strings.objectToSuperviseInvalid;
        expect(supervisor.collectTransitionables()).toEqual([]);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder and returns an empty array if none of the above conditions are true and objectToSuperviseInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.objectToSupervise = {};
        delete supervisor.strings.objectToSuperviseInvalid;

        const str = 'Error missing! objectToSuperviseInvalid';
        expect(supervisor.collectTransitionables()).toEqual([]);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Removes invalid transitionables.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        let ii = 0;
        supervisor.tryToDelegateToTransitionable = jest.fn(() => {
            const val = ii !== 1;
            ii += 1;
            return val;
        });

        supervisor.objectToSupervise = [
            'foo',
            'bar',
            'baz',
        ];

        expect(supervisor.collectTransitionables()).toEqual([
            'foo', 'baz',
        ]);
        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', 'foo', ],
            [ 'transitionableIsValid', 'bar', ],
            [ 'transitionableIsValid', 'baz', ],
        ]);
        expect(console.log).not.toBeCalled();

        console.log = log;
    });
});