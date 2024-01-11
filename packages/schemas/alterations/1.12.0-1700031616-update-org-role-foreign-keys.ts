import { sql } from 'slonik';

import type { AlterationScript } from '../lib/types/alteration.js';

const alteration: AlterationScript = {
  up: async (pool) => {
    await pool.query(sql`
      alter table organization_role_user_relations
        drop constraint organization_role_user_relations_organization_id_fkey;
      alter table organization_role_user_relations
        drop constraint organization_role_user_relations_user_id_fkey;
      alter table organization_role_user_relations
        add foreign key (tenant_id, organization_id, user_id)
        references organization_user_relations (tenant_id, organization_id, user_id)
        on update cascade on delete cascade;
    `);
  },
  down: async (pool) => {
    await pool.query(sql`
      alter table organization_role_user_relations
        -- The constraint name is strange because it's generated by Postgres and it has a 63 character limit
        drop constraint organization_role_user_relati_tenant_id_organization_id_us_fkey;
      alter table organization_role_user_relations
        add foreign key (organization_id)
        references organizations (id)
        on update cascade on delete cascade;
      alter table organization_role_user_relations
        add foreign key (user_id)
        references users (id)
        on update cascade on delete cascade;
    `);
  },
};

export default alteration;
