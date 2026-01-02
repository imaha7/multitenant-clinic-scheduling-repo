import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Tenant } from './tenants.entity';
import { CreateTenantsDto } from './tenants.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantService: TenantsService) {}
  @ApiOperation({ summary: 'Get all tenants' })
  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  @ApiOperation({ summary: 'Get detail tenant' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      example: {
        id: 'a800f9f8-2e27-4f08-9d15-abf2a33673de',
        name: 'Tenant A',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantService.findOne(id);
  }

  @ApiOperation({ summary: 'Create tenant' })
  @Post()
  @ApiBody({ type: CreateTenantsDto })
  create(@Body() tenant: CreateTenantsDto) {
    return this.tenantService.create(tenant);
  }

  @ApiOperation({ summary: 'Update tenant' })
  @Put(':id')
  @ApiBody({ type: CreateTenantsDto })
  update(@Param('id') id: string, @Body() tenant: CreateTenantsDto) {
    return this.tenantService.update(id, tenant);
  }

  @ApiOperation({ summary: 'Delete tenant' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tenantService.remove(id);
  }
}
