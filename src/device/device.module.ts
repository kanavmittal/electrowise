import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

@Module({
    imports:[DatabaseModule],
  controllers: [DeviceController],
  providers: [DeviceService] 
})
export class DeviceModule {
    
}
