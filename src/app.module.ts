import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupabaseModule } from './superbase/superbase.module';
import { validate } from './config/env.validations';
import { UserModule } from './users/user.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ConversationsModule } from './conversations/conversations.module';
import { PeopleModule } from './people/people.module';
import { MemoriesModule } from './memories/memories.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import { DocumentsModule } from './documents/documents.module';
import { RetrievalModule } from './retrieval/retrieval.module';
import { LlmModule } from './llm/llm.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validate,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),

        autoLoadEntities: true,
        synchronize: false,

        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),

    SupabaseModule,

    AuthModule,
    UserModule,
    HealthModule,
    ConversationsModule,
    PeopleModule,
    MemoriesModule,
    EmbeddingsModule,
    DocumentsModule,
    RetrievalModule,
    LlmModule,
    PipelineModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
