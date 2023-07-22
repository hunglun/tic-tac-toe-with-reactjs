import { render } from '@testing-library/react';
import { rotateSquareMatrixBy90Degrees } from './Play';

test('test rotateSquareMatrixBy90Degrees', () => {

    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    const expected = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
    ];
    const actual = rotateSquareMatrixBy90Degrees(matrix);
    expect(actual).toEqual(expected);
});
