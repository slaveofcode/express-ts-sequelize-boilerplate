---
to: src/repositories/pg/models/<%=name%>.model.ts
---
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: '<%=table_name%>',
  timestamps: true,
  paranoid: true,
})
export class <%=h.capitalize(name)%> extends Model<<%=h.capitalize(name)%>> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public column1: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public column2: string | undefined;
}
