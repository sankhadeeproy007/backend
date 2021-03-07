import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {createAuth} from '@keystone-next/auth'
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';

import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
// import { Category } from './schemas/Category';
// import { SubCategory } from './schemas/SubCategory';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/ecommerce';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long a user is signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password']
  }
})


export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      onConnect: async (keystone) => {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone)          
        }
      }
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      // Category,
      // SubCategory,
    }),
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        Boolean(session?.data),
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id name email'
    })
  })
);
