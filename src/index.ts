import 'dotenv/config';
import 'module-alias/register';

import validateEnv from '@/utils/validateEnv';
import App from './app';
import CustomerController from './resources/customer/customer.controller';

validateEnv();

const app = new App(
    [new CustomerController()],
    Number(process.env.PORT)
);

app.listen();