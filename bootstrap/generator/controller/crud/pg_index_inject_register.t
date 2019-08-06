---
to: src/repositories/pg/index.ts
inject: true
after: "User,"
---
  <%=h.inflection.classify(h.inflection.singularize(name))%>,