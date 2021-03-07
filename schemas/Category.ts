import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Category = list({
  fields: {
    name: text({ isRequired: true }),
    subcategories: relationship({
      ref: 'SubCategory.category',
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'subcategories'],
    },
  },
});
