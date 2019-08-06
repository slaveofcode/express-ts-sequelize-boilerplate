---
to: src/repositories/pg/models/<%=h.inflection.classify(h.inflection.singularize(name))%>.model.ts
---
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: '<%=h.inflection.pluralize(name)%>',
  timestamps: true,
  paranoid: true,
})
export class <%=h.inflection.classify(h.inflection.singularize(name))%> extends Model<<%=h.inflection.classify(h.inflection.singularize(name))%>> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public description: string;
}
