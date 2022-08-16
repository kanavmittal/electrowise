import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DeviceModule } from './device/device.module';
import { RoomsModule } from './rooms/rooms.module';
import { SharingModule } from './sharing/sharing.module';
import { CostModule } from './cost/cost.module';
import { GreenCoinService } from './green_coin/green_coin.service';
import { GreenCoinModule } from './green_coin/green_coin.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    DeviceModule,
    RoomsModule,
    SharingModule,
    CostModule,
    GreenCoinModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, GreenCoinService],
})
export class AppModule {}
