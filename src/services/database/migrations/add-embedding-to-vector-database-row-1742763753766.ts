import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddEmbeddingToVectorDatabaseRows1742763753766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'vector_database_rows' AND column_name = 'embedding') THEN
              ALTER TABLE vector_database_rows ADD COLUMN embedding vector(3);
          END IF;
      END $$;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE vector_database_rows DROP COLUMN IF EXISTS embedding;
    `)
  }
}
