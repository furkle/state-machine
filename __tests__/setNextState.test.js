const TransitionSupervisor = require('../').Supervisor;

describe('setNextState tests.', () => {
    it('Logs supervisorNotReinitialized if the supervisor has completed.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        supervisor.setNextState();

        const str = supervisor.strings.supervisorNotReinitialized;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Logs a placeholder if the supervisor has completed and supervisorNotReinitialized is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.isComplete = true;
        delete supervisor.strings.supervisorNotReinitialized;
        supervisor.setNextState();

        const str = 'Error missing! supervisorNotReinitialized';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Does nothing and logs transitionableInvalid if the transitionable is not valid.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        const result = supervisor.setNextState();

        const str = supervisor.strings.transitionableInvalid;
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', undefined);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });

    it('Does nothing and logs a placeholder if the transitionable is not valid and transitionableInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn();
        delete supervisor.strings.transitionableInvalid;
        const result = supervisor.setNextState();

        const str = 'Error missing! transitionableInvalid';
        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(1);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'transitionableIsValid', undefined);
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });

    it('Does nothing and logs transitionableIndexInvalid when data-state-index is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const elem = document.createElement('div');
        elem.setAttribute('data-states', 'foo,bar,baz');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        const result = supervisor.setNextState(elem);

        const str = supervisor.strings.stateIndexInvalid;
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        elem.setAttribute('data-state-index', -1);
        supervisor.setNextState(elem);
        expect(console.log.mock.calls.length).toBe(2);
        expect(console.log).lastCalledWith(str);
        expect(result).toBeFalsy();

        console.log = log;
    });

    it('Does nothing and logs a placeholder when data-state-index is out of band and transitionIndexInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const elem = document.createElement('div');
        elem.setAttribute('data-states', 'foo,bar,baz');

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        delete supervisor.strings.stateIndexInvalid;
        supervisor.setNextState(elem);

        const str = 'Error missing! stateIndexInvalid';
        expect(console.log.mock.calls.length).toBe(1);
        expect(console.log).lastCalledWith(str);

        console.log = log;
    });

    it('Gets the transition-direction from the transitionable.', () => {
        const log = console.log;
        console.log = jest.fn();

        const obj = {};
        obj.getAttribute = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.setNextState(obj);

        expect(obj.getAttribute.mock.calls[0]).toEqual([
            'data-transition-direction',
        ]);

        console.log = log;
    });

    it('Gets the state-index from the transitionable.', () => {
        const log = console.log;
        console.log = jest.fn();

        const obj = {};
        obj.getAttribute = jest.fn();

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.setNextState(obj);

        expect(obj.getAttribute.mock.calls[1]).toEqual([
            'data-state-index',
        ]);

        console.log = log;
    });

    it('Gets the transition-duration from the transitionable.', () => {
        const log = console.log;
        console.log = jest.fn();

        const obj = {};
        obj.getAttribute = jest.fn(() => 12);

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.setNextState(obj);

        expect(obj.getAttribute.mock.calls[2]).toEqual([
            'data-transition-duration',
        ]);

        console.log = log;
    });

    it('Calls getStates.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = { getAttribute: jest.fn(() => 12), };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => true);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls.length)
            .toBe(2);
        expect(supervisor.tryToDelegateToTransitionable).lastCalledWith(
            'getStates', transitionable);

        console.log = log;
    });

    it('Handles execution when data-transition-direction is reverse.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'reverse';
                } else if (name === 'data-state-index') {
                    return '1';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 0, ],
        ]);
    });

    it('Loops back again when data-transition-direction is reverse and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'reverse';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 2, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is reverse and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'reverse';
                } else if (name === 'data-state-index') {
                    return '0';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Handles execution when data-transition-direction is forwards.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'forwards';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Loops back again when data-transition-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'forwards';
                } else if (name === 'data-state-index') {
                    return '2';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 0, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'forwards';
                } else if (name === 'data-state-index') {
                    return '2';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Handles execution when data-transition-direction is shuffle.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'shuffle';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Loops back again and shuffles when data-transition-direction is shuffle and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'shuffle';
                } else if (name === 'data-state-index') {
                    return '2';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
            [ 'shuffle', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 0, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is shuffle and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'shuffle';
                } else if (name === 'data-state-index') {
                    return '2';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Handles execution when data-transition-direction is alternate and data-transition-current-direction is forwards.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'forwards';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Loops back again when data-transition-direction is alternate and data-transition-current-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '2';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'forwards';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-transition-current-direction', 'reverse', ],
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is alternate and data-transition-current-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '2';
                } else if (name === 'data-transition-current-direction') {
                    return 'forwards';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Handles execution when data-transition-direction is alternate and data-transition-current-direction is reverse.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '1';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'reverse';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 0, ],
        ]);
    });

    it('Loops back again when data-transition-direction is alternate and data-transition-current-direction is reverse and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'reverse';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-transition-current-direction', 'forwards', ],
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is alternate and data-transition-current-direction is reverse and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-current-direction') {
                    return 'reverse';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Handles execution when data-transition-direction is alternate-reverse and data-transition-current-direction is forwards.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate-reverse';
                } else if (name === 'data-state-index') {
                    return '1';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'forwards';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 2, ],
        ]);
    });

    it('Loops back again when data-transition-direction is alternate-reverse and data-transition-current-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate-reverse';
                } else if (name === 'data-state-index') {
                    return '2';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'forwards';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-transition-current-direction', 'reverse', ],
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is alternate-reverse and data-transition-current-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '2';
                } else if (name === 'data-transition-current-direction') {
                    return 'forwards';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Handles execution when data-transition-direction is alternate-reverse and data-transition-current-direction is reverse.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate-reverse';
                } else if (name === 'data-state-index') {
                    return '1';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'reverse';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-state-index', 0, ],
        ]);
    });

    it('Loops back again when data-transition-direction is alternate-reverse and data-transition-current-direction is reverse and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate-reverse';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-duration') {
                    return '234ms';
                } else if (name === 'data-transition-current-direction') {
                    return 'reverse';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute.mock.calls).toEqual([
            [ 'data-transition-current-direction', 'forwards', ],
            [ 'data-state-index', 1, ],
        ]);
    });

    it('Removes from transitioning when data-transition-direction is alternate-reverse and data-transition-current-direction is forwards and when relevant.', () => {
        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-current-direction') {
                    return 'reverse';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        expect(supervisor.tryToDelegateToTransitionable.mock.calls).toEqual([
            [ 'transitionableIsValid', transitionable, ],
            [ 'getStates', transitionable, ],
        ]);
        expect(transitionable.getAttribute.mock.calls).toEqual([
            [ 'data-transition-direction', ],
            [ 'data-state-index', ],
            [ 'data-transition-duration', ],
            [ 'data-transition-current-direction', ],
        ]);
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(supervisor.removeFromTransitioning.mock.calls).toEqual([
            [ transitionable, ],
        ]);
    });

    it('Logs transitionCurrentDirectionInvalid if data-transition-current-direction is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-current-direction') {
                    return 'foobar';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        const str = supervisor.strings.transitionCurrentDirectionInvalid;
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(console.log.mock.calls).toEqual([ [ str, ], ]);

        console.log = log;
    });

    it('Logs a placeholder if data-transition-current-direction is out of band and transitionCurrentDirectionInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'alternate';
                } else if (name === 'data-state-index') {
                    return '0';
                } else if (name === 'data-transition-current-direction') {
                    return 'foobar';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        delete supervisor.strings.transitionCurrentDirectionInvalid;
        supervisor.setNextState(transitionable);

        const str = 'Error missing! transitionCurrentDirectionInvalid';
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(console.log.mock.calls).toEqual([ [ str, ], ]);

        console.log = log;
    });

    it('Logs transitionDirectionInvalid if data-transition-current-direction is out of band.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'foobar';
                } else if (name === 'data-state-index') {
                    return '0';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        supervisor.setNextState(transitionable);

        const str = supervisor.strings.transitionDirectionInvalid;
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(console.log.mock.calls).toEqual([ [ str, ], ]);

        console.log = log;
    });

    it('Logs a placeholder if data-transition-current-direction is out of band and transitionCurrentDirectionInvalid is missing.', () => {
        const log = console.log;
        console.log = jest.fn();

        const transitionable = {
            getAttribute: jest.fn(name => {
                if (name === 'data-transition-direction') {
                    return 'foobar';
                } else if (name === 'data-state-index') {
                    return '0';
                }
            }),
            setAttribute: jest.fn(),
        };

        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        supervisor.removeFromTransitioning = jest.fn();
        supervisor.tryToDelegateToTransitionable = jest.fn(() => [ 1, 2, 3, ]);
        delete supervisor.strings.transitionDirectionInvalid;
        supervisor.setNextState(transitionable);

        const str = 'Error missing! transitionDirectionInvalid';
        expect(transitionable.setAttribute).not.toBeCalled();
        expect(console.log.mock.calls).toEqual([ [ str, ], ]);

        console.log = log;
    });
});