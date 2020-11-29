import React         from 'react';
import styled        from '@emotion/styled';
import dynamic       from 'next/dynamic';
import { LazyImage } from '../components/LazyImage';

const BoxWithNoSsr = dynamic(() => import('@chakra-ui/react').then((mod) => mod.Box), {
  ssr: false
});

const mockItems = [
  {
    id:          1,
    src:         '/api/image/w=1280&h=1024/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606290979326-57eee5d182ec',
    placeholder: '/api/image/w=128&h=128/https%3A%2F%2Fimages.unsplash.com%2Fphoto-1606290979326-57eee5d182ec',
  },
  {
    id:          2,
    src:         '/api/image/w=1280&h=1024/https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2416606%2Fpexels-photo-2416606.jpeg',
    placeholder: '/api/image/w=128&h=128/https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2416606%2Fpexels-photo-2416606.jpeg',
  },
  {
    id:          3,
    src:         '/api/image/w=1280&h=1024/https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2832622%2Fpexels-photo-2832622.jpeg',
    placeholder: '/api/image/w=128&h=128/https%3A%2F%2Fimages.pexels.com%2Fphotos%2F2832622%2Fpexels-photo-2832622.jpeg',
  },
  {
    id:          4,
    src:         '/api/image/w=1280&h=1024/https%3A%2F%2Fimages.pexels.com%2Fphotos%2F325181%2Fpexels-photo-325181.jpeg',
    placeholder: '/api/image/w=128&h=128/https%3A%2F%2Fimages.pexels.com%2Fphotos%2F325181%2Fpexels-photo-325181.jpeg',
  },
];

const Image = styled.img`
  height: 450px;
  width: 100%;
  display: block;
  transition: all 0.25s ease;
  object-fit: cover;
  filter: ${props => (props.loading ? 'blur(5px)' : 'none')};
`;

export default function Gallery() {
  return (
    <BoxWithNoSsr w="100%" >
      {mockItems.map((item) => {
        return (
          <LazyImage
            key={item.id}
            src={item.src}
            placeholder={item.placeholder}
          >
            {(src, loading) => {
              return <Image src={src} loading={loading}/>
            }}
          </LazyImage>
        );
      })}
    </BoxWithNoSsr>
  );
}
