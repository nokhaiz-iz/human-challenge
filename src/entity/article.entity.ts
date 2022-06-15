import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("title_index")
  @Column({
    unique: true,
  })
  title: string;

  @Index("slug_index")
  @Column({
    unique: true,
  })
  slug: string;

  @Column({ type: "timestamptz" }) // Recommended
  published_at: Date;
}
