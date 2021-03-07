import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const SubCategory = list({
  fields: {
    name: text({ isRequired: true }),
    category: relationship({
      ref: 'Category.subcategories',
      many: false,
    }),
    products: relationship({
      ref: 'Product.subcategory',
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'category'],
    },
  },
});
