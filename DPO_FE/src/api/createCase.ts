import _axio from '@/utils/MyAxios';
import { File } from 'buffer';
import { FilePondInitialFile } from 'filepond';

async function createCase(idAccount: number, idProcedure: number, idResultForm: number, files: any) {
    let data
    try {
        var bodyFormData = new FormData();
        bodyFormData.append('IdAccount', idAccount.toString());
        bodyFormData.append('IdProcedure', idProcedure.toString());
        bodyFormData.append('IdResultForm', idResultForm.toString());
        for (var i = 0; i < files.length; i++) {
            bodyFormData.append("files", files[i].file);
        }
        // bodyFormData.append("myFiles", myFiles[0]);
        let options = {
            method: "post",
            headers: {
                accept: "application/json",
                "content-type": "multipart/form-data",
            },
            data: bodyFormData,
            url: "Cases/PostCase",
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        };
        const response = await _axio(options)
        console.log('response', response)
        data = response.data;
        return response;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default createCase;
