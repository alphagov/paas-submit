import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-enzyme';

// eslint-disable-next-line functional/no-expression-statement
configure({ adapter: new Adapter() });
