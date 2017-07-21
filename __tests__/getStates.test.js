const TransitionSupervisor = require('../').Supervisor;
const Transitionable = require('../').Transitionable;

describe('getStates tests.', () => {
    it('Logs strings.transitionableInvalid and does nothing if the transitionable is not valid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => false);
        supervisor.getStates();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(supervisor.strings.transitionableInvalid);

        console.log = log;
    });

    it('Logs a placeholder message and does nothing if the transitionable is not valid and transitionableInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => false);
        delete supervisor.strings.transitionableInvalid;
        supervisor.getStates();

        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith('Error missing! transitionableInvalid');

        console.log = log;
    });

    it('Takes states from the data-states attribute and returns a comma-split list', () => {
        const transitionable = document.createElement('div');
        transitionable.setAttribute('data-states', 'foo,bar,baz');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionableIsValid = jest.fn(() => true);

        expect(supervisor.getStates(transitionable)).toEqual([
            'foo',
            'bar',
            'baz',
        ]);
    });

    it('Doesn\'t break, but logs statesInvalid, when data-states is absent or empty.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = document.createElement('div');
        transitionable.setAttribute('data-states', '');

        const supervisor1 = new TransitionSupervisor({
            predicate() {},
        });

        supervisor1.transitionableIsValid = jest.fn(() => true);

        expect(supervisor1.getStates(transitionable)).toEqual([]);

        transitionable.removeAttribute('data-states');

        const supervisor2 = new TransitionSupervisor({
            predicate() {},
        });

        supervisor2.transitionableIsValid = jest.fn(() => true);

        expect(supervisor2.getStates(transitionable)).toEqual([]);
        
        expect(console.log.mock.calls.length).toBe(2);
        expect(console.log.mock.calls[0]).toEqual([
            supervisor2.strings.statesInvalid,
        ]);
        expect(console.log).lastCalledWith(supervisor2.strings.statesInvalid);

        console.log = log;
    });

    it('Doesn\'t break, but logs a placeholder, when data-states is absent or empty and statesInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = document.createElement('div');
        transitionable.setAttribute('data-states', '');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionableIsValid = jest.fn(() => true);
        delete supervisor.strings.statesInvalid;

        expect(supervisor.getStates(transitionable)).toEqual([]);
        
        const str = 'Error missing! statesInvalid';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Doesn\'t break, but logs statesInvalid, when data-states is not a string or array-like object.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = new Transitionable({
            attributes: {
                states: 1245,
            },
        });

        const supervisor1 = new TransitionSupervisor({
            predicate() {},
        });

        supervisor1.transitionableIsValid = jest.fn(() => true);

        expect(supervisor1.getStates(transitionable)).toEqual([]);

        transitionable.removeAttribute('data-states');

        const supervisor2 = new TransitionSupervisor({
            predicate() {},
        });

        supervisor2.transitionableIsValid = jest.fn(() => true);

        expect(supervisor2.getStates(transitionable)).toEqual([]);
        
        expect(console.log.mock.calls.length).toBe(2);
        expect(console.log.mock.calls[0]).toEqual([
            supervisor2.strings.statesInvalid,
        ]);
        expect(console.log).lastCalledWith(supervisor2.strings.statesInvalid);

        console.log = log;
    });

    it('Doesn\'t break, but logs a placeholder, when data-states is not a string or array-like object and statesInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = new Transitionable({
            attributes: {
                states: {},
            },
        });

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionableIsValid = jest.fn(() => true);
        delete supervisor.strings.statesInvalid;

        expect(supervisor.getStates(transitionable)).toEqual([]);
        
        const str = 'Error missing! statesInvalid';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Removes empty entries from the returned list of states.', () => {
        const transitionable = document.createElement('div');
        transitionable.setAttribute('data-states', ',foo,,,bar,baz,,,,');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionableIsValid = jest.fn(() => true);

        expect(supervisor.getStates(transitionable)).toEqual([
            'foo',
            'bar',
            'baz',
        ]);
    });

    it('Converts array-like objects into arrays.', () => {
        const transitionable = new Transitionable({
            attributes: {
                states: {
                    0: 'foo',
                    1: 'bar',
                    2: 'baz',
                    length: 3,
                },
            },
        });

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionableIsValid = jest.fn(() => true);

        const states = supervisor.getStates(transitionable);
        expect(states instanceof Array).toBe(true);
        expect(states).toEqual([ 'foo', 'bar', 'baz', ]);
    });

    it('Does not touch data-states if it is already an array.', () => {
        const transitionable = new Transitionable({
            attributes: {
                states: [
                    'foo',
                    'bar',
                    'baz',
                ],
            },
        });

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionableIsValid = jest.fn(() => true);

        const states = supervisor.getStates(transitionable);
        expect(states).toEqual(transitionable.attributes.states);
    });
});