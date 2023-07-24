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

test("test update table when X loses", () => {
    var table;
    var history;
    table = { ".........": [3, 3, 3, 3, 3, 3, 3, 3, 3] }
    history = { ".........": { "move": { "colIndex": 0, "rowIndex": 0, "marker": "X" } } }
    for (const key_hist in history) {
        const val_hist = history[key_hist];
        for (const key_table in table) {
            const val_table = table[key_table];
            if (key_table === key_hist) {
                table = { ...table, [key_table]: [2, 3, 3, 3, 3, 3, 3, 3, 3] };
                expect(table[key_table][0]).toEqual(2);
            }
        }
    }


    table = { ".........": [3, 3, 3, 3, 3, 3, 3, 3, 3] }
    history = { ".........": { "move": { "colIndex": 1, "rowIndex": 0, "marker": "X" } } }
    for (const key_hist in history) {
        const val_hist = history[key_hist];
        for (const key_table in table) {
            const val_table = table[key_table];
            if (key_table === key_hist) {
                table = { ...table, [key_table]: [3, 2, 3, 3, 3, 3, 3, 3, 3] };
                expect(table[key_table][1]).toEqual(2);
            }
        }
    }

    table = { ".........": [3, 3, 3, 3, 3, 3, 3, 3, 3] }
    history = { ".........": { "move": { "colIndex": 1, "rowIndex": 0, "marker": "X" } } }
    for (const key_hist in history) {
        const val_hist = history[key_hist];
        for (const key_table in table) {
            const val_table = table[key_table];
            if (key_table === key_hist) {
                // q: how to update the list object [] in the dictionary?
                // a: use spread operator
                var updated_list = table[key_table];
                updated_list[val_hist.move.colIndex + val_hist.move.rowIndex * 3] = updated_list[val_hist.move.colIndex + val_hist.move.rowIndex * 3] == 0 ?
                    0 : updated_list[val_hist.move.colIndex + val_hist.move.rowIndex * 3] - 1;
                table = { ...table, [key_table]: updated_list };
                expect(table[key_table][1]).toEqual(2);
            }
        }
    }

    table = {
        ".........": [3, 3, 3, 3, 3, 3, 3, 3, 3],
        "........X": [3, 3, 3, 3, 3, 3, 3, 3, 1]
    }
    history = {
        ".........": {
            "move": { "colIndex": 1, "rowIndex": 0, "marker": "X" }
        },
        "........X": { 
            "move": { "colIndex": 2, "rowIndex": 2, "marker": "X" } }
    };
    for (const key_hist in history) {
        const val_hist = history[key_hist];
        for (const key_table in table) {
            const val_table = table[key_table];
            if (key_table === key_hist) {
                var updated_list = table[key_table];
                updated_list[val_hist.move.colIndex + val_hist.move.rowIndex * 3] = updated_list[val_hist.move.colIndex + val_hist.move.rowIndex * 3] == 0 ?
                    0 : updated_list[val_hist.move.colIndex + val_hist.move.rowIndex * 3] - 1;
                table = { ...table, [key_table]: updated_list };
                expect(table[key_table]).toEqual(updated_list);
                // console.log("table", table)
            }
        }
    }
});

