const TransitionSupervisor = require('../').Supervisor;

describe('doBeforeTransition unit tests', () => {
    it('Does not throw when doBeforeTransition is called.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        expect(() => supervisor.doBeforeTransition()).not.toThrow();
    });
});