import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ){}

  createOrUpdate(createCustomerDto: CreateCustomerDto) {
    const customer = plainToInstance(Customer, createCustomerDto, {ignoreDecorators: true})
    return this.customerRepository.upsert(
      customer,
      {
        conflictPaths: ["id"],
        skipUpdateIfNoValuesChanged: true
      }
    );
  }

}
