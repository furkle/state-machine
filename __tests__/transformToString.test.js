const TransitionSupervisor = require('../').Supervisor;

describe('transformToString unit tests', () => {
    it('Returns an empty string if provided undefined and casts the provided argument to string otherwise.', () => {
        const supervisor = new TransitionSupervisor({
            predicate() {},
        });

        expect(supervisor.transformToString()).toBe('');
        expect(supervisor.transformToString(null)).toBe('null');
        expect(supervisor.transformToString('__testing')).toBe('__testing');
    });
});