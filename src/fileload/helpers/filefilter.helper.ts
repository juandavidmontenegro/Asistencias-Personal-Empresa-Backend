export const fileFilter = ( req : Express.Request, file : Express.Multer.File , cb : Function)=> {
    // validar para subir el archivo de validacion de excel
    if(!file) return cb(new Error('Archivo vacio '), false);

   //const fileExtension = file.mimetype.split('/')[1];
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    const validExtension = ['xlsx' ,'xlsm', 'xls'];

    if(fileExtension && validExtension.includes(fileExtension)){
        return cb(null, true);
    }

    cb(null, false);



}