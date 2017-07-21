const TransitionSupervisor = require('../').Supervisor;

describe('init unit tests', () => {
    it('Resets internal state fields to false.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        /* Dirty the state. */
        supervisor.isComplete = true;
        supervisor.transitionables = [ 'a', 'b', 'c', ];
        supervisor.initTimeoutId = 2;
        supervisor.initIntervalId = 3;
        supervisor.collectTransitionables = jest.fn(() => []);
        supervisor.easingIntervalIds = {
            5: 1,
            6: 2,
            7: 3, 
        };
        supervisor.init();

        /* State is now clean. */
        expect(supervisor.isComplete).toBe(false);
        expect(supervisor.transitionables).toEqual([]);
        expect(supervisor.initTimeoutId).toBe(null);
        expect(supervisor.initIntervalId).toBe(null);
        expect(supervisor.easingIntervalIds).toEqual({});
    });

    it('Iterates over the collected transitionables and sets initial values.', () => {
        const child = {
            getAttribute: jest.fn(),
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        supervisor.collectTransitionables = jest.fn(() => [ child, ]);
        supervisor.init();

        const x = expect.arrayContaining([
            [ 'data-transitionable-id', 0, ],
            [ 'data-state-index', 0, ],
        ]);
        expect(child.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
        ]);
        expect(child.setAttribute.mock.calls).toEqual(x);
        expect(child.removeAttribute.mock.calls).toEqual([
            [ 'data-transition-start-time', ],
        ]);
    });

    it('Sets data-transition-current-direction when data-transition-direction is alternate or alternate-reverse.', () => {
        const child1 = {
            getAttribute: jest.fn(() => 'alternate'),
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
        };

        const child2 = {
            getAttribute: jest.fn(() => 'alternate-reverse'),
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => []);
        supervisor.collectTransitionables = jest.fn(() => [ child1, child2, ]);
        supervisor.init();

        const x1 = expect.arrayContaining([
            [ 'data-transition-current-direction', 'forwards', ],
        ]);
        const x2 = expect.arrayContaining([
            [ 'data-transition-current-direction', 'reverse', ],
        ]);
        expect(child1.setAttribute.mock.calls).toEqual(x1);
        expect(child2.setAttribute.mock.calls).toEqual(x2);
    });
});