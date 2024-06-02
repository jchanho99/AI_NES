import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FirebaseAdminModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { GoogleModule } from './google/google.module';
@Module({
  imports: [
    FirebaseAdminModule,
    GoogleModule,
    SearchModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
