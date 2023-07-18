import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from 'class-validator';
import { Request } from 'express';
import { print } from 'logscribe';

type TObject = Request['query'] | Request['body'];

/**
 * Returns an integer number from the given object.
 * @param key The key to look for.
 * @param object The object that may hold the key.
 * @returns The key or undefined if not found.
 */
export const getIntFromObject = (
  key: string,
  object?: TObject
): number | undefined => {
  try {
    const unknownValue: unknown =
      typeof object === 'object' ? object[key] : undefined;
    if (
      unknownValue !== undefined &&
      (typeof unknownValue === 'string' || typeof unknownValue === 'number')
    ) {
      const int =
        typeof unknownValue === 'string'
          ? parseInt(unknownValue)
          : unknownValue;
      if (!isNaN(int) && int % 1 === 0) {
        return int;
      }
    }
    return undefined;
  } catch (error) {
    print(error);
    return undefined;
  }
};

/**
 * Returns the given string value from the given object.
 * @param key The key to look for.
 * @param object The object that may hold the key.
 * @returns The key or undefined if not found.
 */
export const getStringFromObject = (
  key: string,
  object?: TObject
): string | undefined => {
  try {
    if (typeof object === 'object' && typeof object[key] === 'string') {
      return object[key] as string;
    }
    return undefined;
  } catch (error) {
    print(error);
    return undefined;
  }
};

/**
 * Returns ValidationErrors if the given object does not pass.
 * @param dto Data Transfer Object to test against.
 * @param object The object to test.
 * @param isUpdate Whether the object is an update.
 * @returns ValidationErrors.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validator = async <T extends ClassConstructor<any>>(
  dto: T,
  object: TObject,
  isUpdate = false
): Promise<ValidationError[]> =>
  await validate(plainToClass(dto, object), {
    skipMissingProperties: isUpdate,
    whitelist: isUpdate,
    forbidNonWhitelisted: isUpdate,
    forbidUnknownValues: isUpdate,
  });
