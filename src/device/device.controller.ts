import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { createDeviceDto } from 'src/dto';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private DeviceService: DeviceService) {}
  @UseGuards(AuthenticatedGuard)
  @Get('list')
  getDevices(@Request() req) {
    return this.DeviceService.listDevices(req);
  }
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getOne(@Request() req, @Param() params) {
    return this.DeviceService.oneDevice(req, parseInt(params.id));
  }

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  createDevice(@Body() body: createDeviceDto) {
    return this.DeviceService.createDevice(body);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('data/:id')
  getDeviceData(@Request() req, @Param() params) {
    return this.DeviceService.deviceData(req, parseInt(params.id));
  }
  @UseGuards(AuthenticatedGuard)
  @Delete('delete/:id')
  deleteData(@Param() params) {
    return this.DeviceService.deleteDevice(parseInt(params.id));
  }
  @UseGuards(AuthenticatedGuard)
  @Get('alldata/get')
  getAllData(@Request() req) {
    return this.DeviceService.getAllData(req);
  }
}
