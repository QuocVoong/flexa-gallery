import React    from 'react';
import Uploader from '../components/Uploader';

export default function Upload() {
  return (
    <div>
      <Uploader
        accept="image/*"
        inputContent="Drag your images or Click to browse"
      />
    </div>
  );
}
