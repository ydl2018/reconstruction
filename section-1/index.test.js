import statement from "./index";
import plays from './plays.js'

import invoices from './invoices.js';

test('print acoount list',()=>{
    expect(statement(invoices,plays)).toMatchSnapshot()
})
