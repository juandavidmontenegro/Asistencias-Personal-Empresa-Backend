import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function RequireObservacionIfBoleta(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'requireObservacionIfBoleta',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          async validate(value: any, args: ValidationArguments) {
            try {
              const { object: dto } = args;
              const cedula = (dto as any).cedula;
  
              // La validación se moverá al servicio
              return true;
            } catch (error) {
              console.error('Error en la validación:', error);
              return false;
            }
          },
          defaultMessage() {
            return 'Se requiere una observación al ingresar después de una cita médica o enfermería.';
          },
        },
      });
    };
}