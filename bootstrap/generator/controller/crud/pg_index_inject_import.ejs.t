---
to: src/repositories/pg/index.ts
inject: true
after: "import { User } from './models/User.model';"
---
import { <%=h.inflection.classify(h.inflection.singularize(name))%> } from './models/<%=h.inflection.classify(h.inflection.singularize(name))%>.model';