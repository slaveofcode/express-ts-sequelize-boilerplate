---
to: src/repositories/pg/index.ts
inject: true
skip_if: <%= name %>
after: "User,"
---
  <%=h.capitalize(h.inflection.singularize(name))%>,