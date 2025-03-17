import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enum/validadorRoles';


export const META_ROLES ='Roles';
export const Rolprotect = (...args: Roles[]) =>
    {
        return SetMetadata(META_ROLES, args);
    }
