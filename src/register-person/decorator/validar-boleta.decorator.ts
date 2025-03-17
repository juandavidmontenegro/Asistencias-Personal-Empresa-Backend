import { SetMetadata } from '@nestjs/common';
import { Boletas } from 'src/enum/validatorboletas';


export const META_BOLETAS = 'boletas';

export const ValidarBoleta = (...args: Boletas[]) => 
{
    return SetMetadata(META_BOLETAS, args);

}