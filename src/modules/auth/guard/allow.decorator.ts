import { Reflector } from '@nestjs/core';

export const AllowDecorator = Reflector.createDecorator<boolean>();

export function Allow() {
  return AllowDecorator(true);
}
