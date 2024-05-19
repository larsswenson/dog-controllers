import { Controller, Get, Post, Param, Body, Put, Delete, NotFoundException } from '@nestjs/common';

interface Dog {
  id: number;
  name: string;
  age: number;
}

@Controller('dogs')
export class DogsController {
  private dogs: Dog[] = [];
  private idCounter: number = 1;

  @Get()
  getAllDogs(): Dog[] {
    return this.dogs;
  }

  @Post()
  createDog(@Body() dog: Omit<Dog, 'id'>): Dog {
    const newDog = { id: this.idCounter++, ...dog };
    this.dogs.push(newDog);
    return newDog;
  }

  @Get(':id')
  getDogById(@Param('id') id: number): Dog {
    const dog = this.dogs.find(d => d.id === Number(id));
    if (!dog) {
      throw new NotFoundException('Dog not found');
    }
    return dog;
  }

  @Put(':id')
  updateDog(@Param('id') id: number, @Body() dogData: Omit<Dog, 'id'>): Dog {
    const dogIndex = this.dogs.findIndex(d => d.id === Number(id));
    if (dogIndex === -1) {
      throw new NotFoundException('Dog not found');
    }
    const updatedDog = { id: Number(id), ...dogData };
    this.dogs[dogIndex] = updatedDog;
    return updatedDog;
  }

  @Delete(':id')
  deleteDog(@Param('id') id: number): Dog {
    const dogIndex = this.dogs.findIndex(d => d.id === Number(id));
    if (dogIndex === -1) {
      throw new NotFoundException('Dog not found');
    }
    const deletedDog = this.dogs.splice(dogIndex, 1)[0];
    return deletedDog;
  }
}

