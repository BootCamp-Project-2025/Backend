import { sum } from '../src/contexts/ContextExample/domain/sum';

describe('sum()', () => {
    it('adds two numbers correctly', () => {
        expect(sum(2, 3)).toBe(5);
    });
});
