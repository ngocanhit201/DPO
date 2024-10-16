// @ts-nocheck
'use client'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// Our app
export default function App({ onValueChange }) {
    const [files, setFiles] = useState([])
    const handleInputFileChange = (value) => {
        setFiles(value)
        onValueChange(value)
        console.log(files)
    };
    return (
        <>
            <div >
                <FilePond
                    files={files}
                    onupdatefiles={handleInputFileChange}
                    allowMultiple={true}
                    name="files" /* sets the file input name, it's filepond by default */
                    labelIdle='Nhấp để tải lên<span class="filepond--label-action"></span>'
                />
            </div></>
    )

}
