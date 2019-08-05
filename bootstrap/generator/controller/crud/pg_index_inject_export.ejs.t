---
to: src/repositories/pg/index.ts
inject: true
after: "export {"
---
  <%=h.inflection.classify(h.inflection.singularize(name))%>,