import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Boletas } from 'src/enum/validatorboletas';

export function RequireFechaBoleta(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requireFechaBoleta',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as any;
          if (object.boleta === Boletas.enfermeria && 
            Boletas.dia_compensado && Boletas.dia_no_remunerado && Boletas.remito_enfermeria) {
            return value !== undefined && value !== null;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'La fecha de la boleta es requerida cuando el tipo de salida es cita médica';
        },
      },
    });
  };
}