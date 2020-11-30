import React, { useState } from 'react';
import { Box }             from '@chakra-ui/react';
import Dropzone            from 'react-dropzone-uploader';

export const Uploader = ({ accept, inputContent }) => {

  const getUploadParams = ({ meta }) => {
    const url = '/api/upload';
    return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files, allFiles) => {
    console.log(files.map(f => f.meta));
    allFiles.forEach(f => f.remove());
  };

  return (
    <Box w={500}>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        autoUpload={false}
        accept={accept}
        maxSizeBytes={20 * 1024 * 1024}
        maxFiles={10}
        inputContent={(files, extra) => (extra.reject ? `${accept} files only` : inputContent)}
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel:     (files, extra) => (extra.reject ? { color: 'red' } : {}),
        }}
      />
    </Box>
  );

};

export default Uploader;