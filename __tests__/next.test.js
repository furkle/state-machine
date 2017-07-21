const TransitionSupervisor = require('../').Supervisor;

describe('next tests', () => {
    it('Tests side effects.', () => {
        const ta = document.createElement('div');
        ta.setAttribute('data-states', 'foo,bar');
        document.body.appendChild(ta);

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionAll = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.transitionables = [ ta, ];
        supervisor.next();

        expect(supervisor.transitionAll.mock.calls.length).toBe(1);
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', ta);
    });

    it('Filters out items that are invalid.', () => {
        const ta1 = {};
        const ta2 = document.createElement('div');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        let ii = 0;
        supervisor.tryToDelegateToTransitionable = jest.fn(() => {
            const val = ii === 1;
            ii++;
            return val;
        });
        supervisor.transitionables = [ ta1, ta2, ];
        supervisor.removeFromTransitioning = jest.fn();
        supervisor.transitionAll = jest.fn();
        supervisor.next();

        expect(supervisor.transitionables.length).toBe(1);
        expect(supervisor.removeFromTransitioning.mock.calls.length).toBe(1);
    });

    it('Stops the execution of the supervisor if there are no remaining transitionables.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.stop = jest.fn();
        supervisor.transitionables = [];
        supervisor.next();

        expect(supervisor.stop.mock.calls.length).toBe(1);
    });

    it('Logs supervisorNotReinitialized when isComplete is true.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionAll = jest.fn();
        supervisor.stop = jest.fn();
        supervisor.isComplete = true;

        supervisor.next();

        const str = supervisor.strings.supervisorNotReinitialized;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder message when isComplete is true and supervisorNotReinitialized is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        delete supervisor.strings.supervisorNotReinitialized;

        supervisor.transitionAll = jest.fn();
        supervisor.stop = jest.fn();
        supervisor.isComplete = true;

        supervisor.next();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Adds a start time to the transitionable if one does not exist.', () => {
        const transitionable = {
            getAttribute: jest.fn(),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionables = [ transitionable, ];
        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.next();

        expect(transitionable.getAttribute.mock.calls.length).toBe(1);
        expect(transitionable.getAttribute)
            .lastCalledWith('data-transition-start-time');
        expect(transitionable.setAttribute.mock.calls.length).toBe(2);
        expect(transitionable.setAttribute.mock.calls[0][0])
            .toBe('data-transition-start-time');
    });

    it('Adds a start time to the transitionable if one does not exist.', () => {
        const transitionable = {
            getAttribute: jest.fn(() => 23456),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.transitionables = [ transitionable, ];
        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.next();

        expect(transitionable.getAttribute.mock.calls.length).toBe(1);
        expect(transitionable.getAttribute)
            .lastCalledWith('data-transition-start-time');
        expect(transitionable.setAttribute.mock.calls.length).toBe(1);
        expect(transitionable.setAttribute.mock.calls[0][0]).
            toBe('data-transition-interval-started-at');
    });
});