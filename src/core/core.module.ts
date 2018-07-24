import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

export interface CoreModuleOptions {
  enableLogging: boolean;
}

@Module( {
  imports: [ConfigModule],
  exports: [ConfigModule],
})
export class CoreModule{ }
