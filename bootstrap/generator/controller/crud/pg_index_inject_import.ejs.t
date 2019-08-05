---
to: src/repositories/pg/index.ts
inject: true
skip_if: <%= name %>
after: "import { User } from './models/User.model';"
---
import { <%=h.capitalize(h.inflection.singularize(name))%> } from './models/<%=h.capitalize(h.inflection.singularize(name))%>.model';